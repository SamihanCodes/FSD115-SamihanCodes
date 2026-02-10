import { useEffect, useState } from "react";
import {
  getMyNotifications,
  markNotificationRead,
} from "../api/notifications";
import Footer from "../components/Footer";
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getMyNotifications().then((res) => setNotifications(res.data));
  }, []);

  const markRead = async (id) => {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      )
    );
  };

  return (
    <>
      <div className="page-wrapper">
        {/* GLOBAL BACKGROUND PATTERN */}
        <div className="page-pattern" />

        <div className="glass-box notifications-page">
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">
            Stay updated with platform activity
          </p>

          {notifications.length === 0 && (
            <p className="empty-text">
              No notifications available
            </p>
          )}

          <div className="notifications-list">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`notification-card ${
                  n.is_read ? "read" : "unread"
                }`}
              >
                <h4>{n.title}</h4>
                <p>{n.message}</p>

                {!n.is_read && (
                  <button
                    className="mark-read-btn"
                    onClick={() => markRead(n.id)}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Notifications;
