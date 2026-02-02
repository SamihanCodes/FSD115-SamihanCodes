import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container">
        <p>No user data available</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleColor = {
    seller: "#16a34a",
    buyer: "#2563eb",
    admin: "#7c3aed",
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h2 style={{ marginBottom: "4px" }}>
            Welcome back 👋
          </h2>
          <p style={{ color: "#475569" }}>
            {user.email}
          </p>
        </div>

        <span
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            backgroundColor: roleColor[user.role],
            color: "white",
            fontSize: "13px",
            textTransform: "capitalize",
          }}
        >
          {user.role}
        </span>
      </div>

      {/* STATS CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div className="card">
          <h3>Account Status</h3>
          <p className="success">Active</p>
        </div>

        <div className="card">
          <h3>Platform</h3>
          <p>LiveStockHub</p>
        </div>
      </div>

      {/* ROLE BASED SECTION */}
      <div className="card">
        {user.role === "seller" && (
          <>
            <h3>Seller Control Panel</h3>
            <p>Manage your livestock business.</p>

            <ul style={{ lineHeight: "1.8" }}>
              <li>📦 Create and manage listings</li>
              <li>💰 View bids from buyers</li>
              <li>💬 Chat with interested buyers</li>
              <li>📄 Track sales and transactions</li>
            </ul>

            <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
              <button onClick={() => navigate("/listings/create")}>
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

            <ul style={{ lineHeight: "1.8" }}>
              <li>🔍 Browse available listings</li>
              <li>💸 Place competitive bids</li>
              <li>❤️ Save interests</li>
              <li>💬 Chat with sellers</li>
            </ul>

            <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
              <button onClick={() => navigate("/listings")}>
                Browse Listings
              </button>
              <button onClick={() => navigate("/bids/my")}>
                My Bids
              </button>
            </div>
          </>
        )}

        {user.role === "admin" && (
          <>
            <h3>Admin Control Center</h3>
            <p>Platform management and monitoring.</p>

            <ul style={{ lineHeight: "1.8" }}>
              <li>👥 Manage users</li>
              <li>📊 View analytics</li>
              <li>🧾 Monitor transactions</li>
              <li>🔐 System oversight</li>
            </ul>

            <div style={{ marginTop: "12px" }}>
              <button onClick={() => navigate("/admin")}>
                Go to Admin Panel
              </button>
            </div>
          </>
        )}
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "24px",
          backgroundColor: "#EF4444",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
