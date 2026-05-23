import { createClient } from 'npm:@supabase/supabase-js@2'
import { JWT } from 'npm:google-auth-library@9'
import serviceAccount from '../service-account.json' with { type: 'json' }

interface NotificationRecord {
  id: string
  user_id: string | null
  title: string
  message: string
  type: string
  read: boolean
  created_at: string
}

interface WebhookPayload {
  type: 'INSERT'
  table: string
  record: NotificationRecord
  schema: 'public'
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

Deno.serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json()
    const { user_id, title, message } = payload.record

    if (!title) {
      return new Response('Missing title', { status: 200 })
    }

    let tokens: string[] = []

    if (payload.record.type === 'pedido') {
      const { data, error } = await supabase
        .from('usuario')
        .select('fcm_token')
        .eq('role', 'admin')
        .not('fcm_token', 'is', null)

      if (error) {
        console.error('Error fetching admins:', error.message)
        return new Response('Error fetching admins', { status: 200 })
      }

      if (!data || data.length === 0) {
        console.warn('No admins with FCM tokens found')
        return new Response('No admins with FCM tokens', { status: 200 })
      }

      tokens = data.map(u => u.fcm_token!)
    } else if (user_id) {
      const { data, error } = await supabase
        .from('usuario')
        .select('fcm_token')
        .eq('id', user_id)
        .single()

      if (error || !data?.fcm_token) {
        console.error('Error fetching user or no FCM token:', error?.message ?? 'No token')
        return new Response('User not found or no FCM token', { status: 200 })
      }

      tokens = [data.fcm_token]
    } else {
      return new Response('No recipient determined', { status: 200 })
    }

    const accessToken = await getAccessToken({
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    })

    const results = await Promise.allSettled(
      tokens.map(token =>
        fetch(
          `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              message: {
                token,
                notification: { title, body: message },
              },
            }),
          },
        ),
      ),
    )

    const successes = results.filter(r => r.status === 'fulfilled' && r.value.ok).length
    const failures = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.ok)).length

    if (failures > 0) {
      console.error(`FCM send: ${successes} ok, ${failures} failed`)
    }

    return new Response(JSON.stringify({ successes, failures }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Push function error:', err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})

const getAccessToken = ({
  clientEmail,
  privateKey,
}: {
  clientEmail: string
  privateKey: string
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const jwtClient = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    })
    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err)
        return
      }
      resolve(tokens!.access_token!)
    })
  })
}
