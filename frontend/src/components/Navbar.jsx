import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyNotifications } from "../api/notifications";
import logo from "../assets/logo.webp";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [hasNotification, setHasNotification] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      getMyNotifications().then((res) => {
        setHasNotification(res.data.length > 0);
      });
    }
  }, [user]);

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <img src={logo} alt="logo" />
        <Link to="/" className="brand">LivestockHub</Link>
        <Link to="/" className="nav-btn dark">Home</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {user && (
          <>
            <Link className="nav-btn dark" to="/dashboard">Dashboard</Link>
            <Link className="nav-btn dark" to="/profile">Profile</Link>

            {/* SELLER */}
            {user.role === "seller" && (
              <>
                <Link className="nav-btn dark" to="/listings/create">Create</Link>
                <Link className="nav-btn dark" to="/listings/my">My Listings</Link>
                <Link className="nav-btn dark" to="/seller/chats">Chats</Link>

                {/* MORE DROPDOWN */}
                <div className="more-wrapper">
                  <button
                    className="nav-btn dark"
                    onClick={() => setOpenMore(!openMore)}
                  >
                    More ▾
                  </button>

                  {openMore && (
                    <div className="dropdown">
                      <Link to="/interests/my">Interests</Link>
                      <Link to="/bids/my">Bids</Link>
                      <Link to="/transactions/my">Transactions</Link>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* BUYER */}
            {user.role === "buyer" && (
              <>
                <Link className="nav-btn dark" to="/listings">Listings</Link>
                <Link className="nav-btn dark" to="/transactions/my">Transactions</Link>
              </>
            )}

            {/* ADMIN */}
            {user.role === "admin" && (
              <Link className="nav-btn dark" to="/admin">Admin</Link>
            )}

            {/* NOTIFICATIONS */}
            <Link to="/notifications" className="nav-btn dark">
              Notifications
              {hasNotification && <span className="dot" />}
            </Link>

            <button onClick={handleLogout} className="nav-btn outline">
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link className="nav-btn dark" to="/login">Login</Link>
            <Link className="nav-btn primary" to="/register">Register</Link>
          </>
        )}
      </div>

      {/* STYLES */}
      <style>{`
        .navbar {
          height: 88px;
          background: linear-gradient(90deg, #02394A, #012136);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 42px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-left img {
          height: 50px;
        }

        .brand {
          font-size: 24px;
          font-weight: 900;
          color: #E6F4F6;
          text-decoration: none;
          margin-right: 8px;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-btn {
          padding: 10px 22px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          transition: all 0.4s ease;
          box-shadow: rgb(0 0 0 / 6%) 0 0 8px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .nav-btn.dark {
          background: #ffffff;
          color: #012136;
        }

        .nav-btn.dark:hover {
          letter-spacing: 2.5px;
          background: #4C97A8;
          color: white;
          box-shadow: rgb(76 151 168) 0px 8px 30px;
        }

        .nav-btn.primary {
          background: #4C97A8;
          color: white;
        }

        .nav-btn.primary:hover {
          background: #02394A;
          letter-spacing: 2.5px;
        }

        .nav-btn.outline {
          background: transparent;
          color: #E6F4F6;
          border: 2px solid #4C97A8;
        }

        .nav-btn.outline:hover {
          background: #4C97A8;
          color: white;
          letter-spacing: 2.5px;
        }

        .nav-btn:active {
          transform: translateY(6px);
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #22C55E;
          border-radius: 50%;
        }

        /* DROPDOWN */
        .more-wrapper {
          position: relative;
        }

        .dropdown {
          position: absolute;
          top: 52px;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.2);
          overflow: hidden;
          min-width: 180px;
          z-index: 999;
        }

        .dropdown a {
          display: block;
          padding: 12px 18px;
          text-decoration: none;
          color: #012136;
          font-weight: 600;
          font-size: 13px;
          transition: background 0.2s;
        }

        .dropdown a:hover {
          background: #CCE7EC;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
