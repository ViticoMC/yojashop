import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

const SW_PATH = "/firebase-messaging-sw.js";

async function getSwRegistration(): Promise<ServiceWorkerRegistration> {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker.register(SW_PATH);
  }
  throw new Error("Service workers not supported");
}

export async function getFcmToken() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return null;
    }

    const registration = await getSwRegistration();

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
}

export function listenForMessages() {
  onMessage(messaging, (payload) => {
    console.log("Foreground push message received:", payload);
  });
}

export async function registerFirebaseSw() {
  try {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register(SW_PATH);
    }
  } catch (error) {
    console.error("Error registering Firebase SW:", error);
  }
}
