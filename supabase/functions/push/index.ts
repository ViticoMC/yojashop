import { createClient } from 'npm:@supabase/supabase-js@2'
import { JWT } from 'npm:google-auth-library@9'
import serviceAccount from '../service-account.json' with { type: 'json' }

interface NotificationRecord {
  id: string
  user_id: string
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
  Deno.env.get('VITE_SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SECRET_KEY')!,
)

Deno.serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json()
    const { user_id, title, message } = payload.record

    if (!user_id || !title) {
      return new Response('Missing user_id or title', { status: 200 })
    }

    const { data, error } = await supabase
      .from('usuario')
      .select('fcm_token')
      .eq('id', user_id)
      .single()

    if (error || !data?.fcm_token) {
      console.error('Error fetching user or no FCM token:', error?.message ?? 'No token')
      return new Response('User not found or no FCM token', { status: 200 })
    }

    const accessToken = await getAccessToken({
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    })

    const res = await fetch(
      `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          message: {
            token: data.fcm_token,
            notification: {
              title,
              body: message,
            },
          },
        }),
      },
    )

    const resData = await res.json()

    if (!res.ok) {
      console.error('FCM send error:', resData)
      return new Response(JSON.stringify(resData), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(resData), {
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
