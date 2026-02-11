import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div className="dashboard-page">No user data available</div>;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="dashboard-page">
        {/*  PAGE BACKGROUND PATTERN */}
        <div className="page-pattern" />

        {/* CONTENT */}
        <div className="dashboard-container glass-box">
          {/* HEADER */}
          <div className="dashboard-header">
            <div>
              <h1 className="welcome-text">Welcome Back</h1>
              <p className="welcome-email">{user.email}</p>
            </div>

            <span className={`role-badge ${user.role}`}>
              {user.role}
            </span>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card accent-teal">
              <h3>Account Status</h3>
              <p className="status-active">Active</p>
            </div>

            <div className="stat-card accent-dark">
              <h3>Platform</h3>
              <p>LiveStockHub</p>
            </div>
          </div>

          {/* ROLE PANEL */}
          <div className="role-card">
            {user.role === "seller" && (
              <>
                <h3>Seller Control Panel</h3>
                <p>Manage your livestock business efficiently.</p>

                <ul>
                  <li>📦 Create and manage listings</li>
                  <li>💰 View bids from buyers</li>
                  <li>💬 Chat with buyers</li>
                  <li>📄 Track transactions</li>
                </ul>

                <div className="action-row">
                  <button className="action-row-one" onClick={() => navigate("/listings/create")}>
                    Create Listing
                  </button>
                  <button onClick={() => navigate("/listings/my")}>
                    My Listings
                  </button>
                </div>
              </>
            )}

            {user.role === "buyer" && (
              <>
                <h3>Buyer Marketplace</h3>
                <p>Discover and bid on livestock.</p>

                <ul>
                  <li>🔍 Browse listings</li>
                  <li>💸 Place competitive bids</li>
                  <li>❤️ Save interests</li>
                  <li>💬 Chat with sellers</li>
                </ul>

                <div className="action-row">
                  <button onClick={() => navigate("/listings")}>
                    Browse Listings
                  </button>
                </div>
              </>
            )}

            {user.role === "admin" && (
              <>
                <h3>Admin Control Center</h3>
                <p>System monitoring & platform management.</p>

                <ul>
                  <li>👥 Manage users</li>
                  <li>📊 View analytics</li>
                  <li>🧾 Monitor transactions</li>
                  <li>🔐 System oversight</li>
                </ul>

                <div className="action-row">
                  <button onClick={() => navigate("/admin")}>
                    Go to Admin Panel
                  </button>
                </div>
              </>
            )}
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
