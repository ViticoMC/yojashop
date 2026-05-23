import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

export async function getFcmToken() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
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
