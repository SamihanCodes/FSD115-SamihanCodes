import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyNotifications } from "../api/notifications";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [hasNotification, setHasNotification] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      getMyNotifications().then((res) => {
        setHasNotification(res.data.length > 0);
      });
    } else {
      setHasNotification(false);
    }
  }, [user]);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>

      {user && (
        <>
          {" | "}
          <Link to="/dashboard">Dashboard</Link>

          {" | "}
          <Link to="/profile">Profile</Link>

          {/* SELLER LINKS */}
          {user.role === "seller" && (
            <>
              {" | "}
              <Link to="/listings/create">Create Listing</Link>
              {" | "}
              <Link to="/listings/my">My Listings</Link>
              {" | "}
              <Link to="/interests/my">View Interests</Link>
              {" | "}
              <Link to="/bids/my">View Bids</Link>
              {" | "}
              <Link to="/seller/chats">Chats</Link>
            </>
          )}

          {/* BUYER LINKS */}
          {user.role === "buyer" && (
            <>
              {" | "}
              <Link to="/listings">Listings</Link>
            </>
          )}

          {/* COMMON (NON-ADMIN) */}
          {user.role !== "admin" && (
            <>
              {" | "}
              <Link to="/transactions/my">My Transactions</Link>
            </>
          )}

          {/* ADMIN LINKS */}
          {user.role === "admin" && (
            <>
              {" | "}
              <Link to="/admin">Admin</Link>
            </>
          )}
          {" | "}
          <Link
            to="/notifications"
            style={{ position: "relative", display: "inline-block" }}
          >
            Notifications
            {hasNotification && (
              <span
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "-10px",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#EF4444",
                  borderRadius: "50%",
                }}
              />
            )}
          </Link>

          {" | "}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </>
      )}

      {!user && (
        <>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};
export default Navbar;
