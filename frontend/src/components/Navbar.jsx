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
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          />
        )}
      </Link>

      {user && (
        <>
          {" | "}
          <Link to="/dashboard">Dashboard</Link>

          {user.role === "seller" && (
            <>
              {" | "}
              <Link to="/listings/create">Create Listing</Link>
              {" | "}
              <Link to="/listings/my">My Listings</Link>
              {" | "}
              <Link to="/interests/my">View Interests</Link>
            </>
          )}

          {user.role === "buyer" && (
            <>
              {" | "}
              <Link to="/listings">Listings</Link>
            </>
          )}

          {" | "}
          <Link to="/profile">Profile</Link>

          {" | "}
          <Link to="/bids/my">View Bids</Link>

          {" | "}
          <Link to="/transactions/my">My Transactions</Link>

          {user.role === "admin" && (
            <>
              {" | "}
              <Link to="/admin">Admin</Link>
            </>
          )}

          {" | "}
          <button onClick={handleLogout}>Logout</button>
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
