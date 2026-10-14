
import { getToken, onMessage } from "firebase/messaging";
import { getMessagingInstance } from "./firebase";
import axios from "../utils/axios";

export async function registerWebPushToken() {
  if (!("Notification" in window)) {
    throw new Error("This browser does not support notifications");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission was not granted");
  }

  const messaging = await getMessagingInstance();

  if (!messaging) {
    throw new Error("Firebase Messaging is not supported");
  }

  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js"
  );

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });

  if (!token) {
    throw new Error("FCM token could not be generated");
  }

  // Requires the protected backend endpoint from Step 4.
  await axios.post("/api/notifications/register-token", {
    token,
    platform: "web",
  });

  return token;
}





export async function listenForWebPush(callback) {
    const messaging = await getMessagingInstance();
  
    if (!messaging) {
      console.error("Messaging instance unavailable");
      return () => {};
    }
  
    return onMessage(messaging, (payload) => {
      console.log("FCM MESSAGE RECEIVED:", payload);
  
      const title = payload.notification?.title || "Pronex World";
      const body =
        payload.notification?.body || "You have a new update.";
  
      if (Notification.permission === "granted") {
        const notification = new Notification(title, { body });
        notification.onshow = () =>
          console.log("FCM NOTIFICATION SHOWN");
        notification.onerror = (event) =>
          console.error("FCM NOTIFICATION ERROR", event);
      }
  
      callback(payload);
    });
  }
  
  
  
