import { useEffect, useState } from "react";
import { getMyNotifications } from "../api/notifications";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getMyNotifications().then((res) => setNotifications(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Notifications</h2>

      {notifications.length === 0 && <p>No notifications</p>}

      {notifications.map((n) => (
        <div key={n.id} className="card">
          <p>{n.message}</p>
          <small>{new Date(n.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
