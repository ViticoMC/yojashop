# Configuración de Push Notifications

## Requisito: `service-account.json`

La Edge Function `push/index.ts` necesita un archivo `service-account.json` para autenticarse
con Firebase Cloud Messaging (FCM) y enviar notificaciones push.

### Cómo generar el archivo

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona el proyecto **yojashop-48d3c**
3. Ve a **Configuración del proyecto** → **Cuentas de servicio**
4. Selecciona la pestaña **Firebase Admin SDK**
5. Haz clic en **Generar nueva clave privada**
6. Se descargará un archivo JSON automáticamente

### Cómo instalarlo

1. Copia el archivo descargado a esta ubicación:
   ```
   cp ~/Downloads/nombre-del-archivo.json supabase/functions/push/service-account.json
   ```

2. Verifica que esté en `.gitignore` (ya incluido) para no committearlo.

3. Despliega la Edge Function:
   ```bash
   supabase functions deploy push
   ```

### Estructura esperada del archivo

El archivo debe contener al menos estos campos:

```json
{
  "type": "service_account",
  "project_id": "yojashop-48d3c",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@yojashop-48d3c.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}
```

### Webhook en Supabase

Además, asegúrate de configurar el Database Webhook en Supabase:

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard/)
2. Proyecto → **Database** → **Webhooks**
3. Crea un webhook:
   - **Name:** `push-notifications`
   - **Table:** `notifications`
   - **Events:** `INSERT`
   - **Source type:** `Supabase Edge Function`
   - **Edge Function:** `push`
   - **Method:** `POST`
   - **HTTP Headers:** `Content-Type: application/json`
