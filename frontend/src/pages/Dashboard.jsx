import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <p>
        <strong>Role:</strong> {user?.role}
      </p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
