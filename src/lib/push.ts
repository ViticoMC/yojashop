import { getToken, onMessage, deleteToken } from "firebase/messaging";
import { toast } from "sonner";
import { messaging } from "./firebase";
import { supabase } from "./supabase";

const SW_PATH = "/firebase-messaging-sw.js";



function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function getFcmToken() {
  try {
    if (!("serviceWorker" in navigator)) {
      console.warn("Service workers not supported in this browser");
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission not granted:", permission);
      return null;
    }

    const registration = await navigator.serviceWorker.register(SW_PATH);
    await navigator.serviceWorker.ready;

    if (!registration.active) {
      console.error("SW registered but not active");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    return token;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
      console.error("Error getting FCM token:", msg);
    

    return null;
  }
}

export async function refreshFcmToken() {
  try {
    if (await deleteToken(messaging)) {
      console.log("Old FCM token deleted");
    }
    return getFcmToken();
  } catch (error) {
    console.error("Error refreshing FCM token:", error);
    return null;
  }
}

export async function saveFcmTokenForCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fcmToken = await getFcmToken();
    if (fcmToken) {
      await supabase
        .from("usuario")
        .update({ fcm_token: fcmToken })
        .eq("id", user.id);
    }
  } catch (error) {
    console.error("Error saving FCM token:", error);
  }
}

export function listenForMessages() {
  onMessage(messaging, (payload) => {
    const title = payload.notification?.title ?? "Nueva notificación";
    const body = payload.notification?.body ?? "";
    toast(title, {
      description: body,
      duration: 5000,
    });
  });
}

export async function registerFirebaseSw() {
  try {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.register(SW_PATH);
      await navigator.serviceWorker.ready;
      return registration;
    }
  } catch (error) {
    console.error("Error registering Firebase SW:", error);
  }
}

export async function testPushDiagnostic() {

  if (!("serviceWorker" in navigator)) {
    console.log("❌ Service workers not supported");
    return;
  }

  const registration = await navigator.serviceWorker.register(SW_PATH);
  await navigator.serviceWorker.ready;
  
  

  try {
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });
    console.log("✅ Push API subscribe SUCCESS!");
    console.log("Endpoint:", sub.endpoint.slice(0, 80) + "...");
    return sub;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log("❌ Push API subscribe FAILED:", msg);
  }
}
