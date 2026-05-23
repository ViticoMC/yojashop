importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyCH30BbQgCjt4gB6bo2LwOTBPVkJRBbjn8",
  authDomain: "yojashop-48d3c.firebaseapp.com",
  projectId: "yojashop-48d3c",
  storageBucket: "yojashop-48d3c.firebasestorage.app",
  messagingSenderId: "628596596440",
  appId: "1:628596596440:web:a07d296dc962f0b71bc1ad",
  measurementId: "G-LTCW44HNC6",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "Nueva notificación";
  const notificationBody = payload.notification?.body || "";

  self.registration.showNotification(notificationTitle, {
    body: notificationBody,
    icon: "/favicon.ico",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
