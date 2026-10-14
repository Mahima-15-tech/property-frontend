
import { useState } from "react";
import toast from "react-hot-toast";
import { registerWebPushToken } from "../firebase/notification";

export default function TestNotification() {
  const [loading, setLoading] = useState(false);

  const handleEnableNotifications = async () => {
    try {
      setLoading(true);

      const token = await registerWebPushToken();

      console.log("FCM Token:", token);
      toast.success("Notifications enabled successfully");
    } catch (error) {
      console.error("Notification error:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnableNotifications}
      disabled={loading}
      className="rounded-lg bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
    >
      {loading ? "Enabling..." : "Enable Notifications"}
    </button>
  );
}
