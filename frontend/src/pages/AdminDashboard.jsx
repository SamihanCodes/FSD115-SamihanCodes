import { useEffect, useState } from "react";
import {
  getAdminDashboardStats,
  getTransactionsChart,
  getRevenueChart,
  getLatestListings,
} from "../api/adminAnalytics";
import api from "../api/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Footer from "../components/Footer";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [transactionsData, setTransactionsData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [latestListings, setLatestListings] = useState([]);

  const [users, setUsers] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [activeTab, setActiveTab] = useState("analytics");

  useEffect(() => {
    getAdminDashboardStats().then((res) => setStats(res.data));
    getTransactionsChart().then((res) => setTransactionsData(res.data || []));
    getRevenueChart().then((res) => setRevenueData(res.data || []));
    getLatestListings().then((res) => setLatestListings(res.data || []));

    api.get("/admin/users").then((res) => setUsers(res.data));
    api.get("/admin/listings").then((res) => setAllListings(res.data));
  }, []);

  if (!stats) {
    return <div className="container">Loading admin dashboard...</div>;
  }

  const Card = ({ title, value }) => (
    <div className="stat-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );

  const handleBlockToggle = async (user) => {
    if (user.is_blocked) {
      await api.put(`/admin/users/${user.id}/unblock`);
    } else {
      await api.put(`/admin/users/${user.id}/block`);
    }
    const refreshed = await api.get("/admin/users");
    setUsers(refreshed.data);
  };

  return (
    <>
      <div className="page-wrapper admin-page">
        {/* BACKGROUND PATTERN */}
        <div className="pattern-bg" />

        <div className="glass-box admin-container">
          {/* HEADING */}
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">
            Platform analytics, moderation & system overview
          </p>

          {/* TABS */}
          <div className="admin-tabs">
            {["analytics", "users", "listings"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "analytics" && "📊 Analytics"}
                {tab === "users" && "👤 Users"}
                {tab === "listings" && "📦 Listings"}
              </button>
            ))}
          </div>

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <>
              <div className="stats-grid">
                <Card title="Total Users" value={stats.total_users} />
                <Card title="Total Listings" value={stats.total_listings} />
                <Card title="Transactions" value={stats.total_transactions} />
                <Card title="Revenue" value={`₹ ${stats.total_revenue}`} />
              </div>

              <div className="chart-card">
                <h3>Transactions Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={transactionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                      dataKey="count"
                      stroke="#4C97A8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Revenue Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      dataKey="revenue"
                      stroke="#22C55E"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* USERS */}
          {activeTab === "users" && (
            <div className="card">
              <h3>User Moderation</h3>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td
                        className={
                          u.is_blocked ? "status-blocked" : "status-active"
                        }
                      >
                        {u.is_blocked ? "Blocked" : "Active"}
                      </td>
                      <td>
                        <button
                          className={
                            u.is_blocked ? "btn-success" : "btn-danger"
                          }
                          onClick={() => handleBlockToggle(u)}
                        >
                          {u.is_blocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* LISTINGS */}
          {activeTab === "listings" && (
            <div className="card">
              <h3>All Listings</h3>

              {allListings.map((l) => (
                <div key={l.id} className="listing-row">
                  <div>
                    <strong>{l.animal_type}</strong>
                    <div className="muted">
                      Seller: {l.seller_email}
                    </div>
                  </div>
                  <span>₹ {l.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminDashboard;
