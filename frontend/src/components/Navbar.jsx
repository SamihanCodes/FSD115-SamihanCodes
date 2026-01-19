import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>{" | "}

      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link>{" | "}

          {user.role === "seller" && (
            <>
              <Link to="/listings/create">Create Listing</Link>{" | "}
              <Link to="/listings/my">My Listings</Link>{" | "}
              <Link to="/interests/my">View Interests</Link>{" | "}
            </>
          )}

          {user.role === "buyer" && (
            <Link to="/listings">Listings</Link>
            
          )}
          {" | "}<Link to="/profile">Profile</Link>{" | "}
          <Link to="/bids/my">View Bids</Link>{" | "}
          <Link to="/transactions/my">My Transactions</Link>{" | "}

          {" | "}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {!user && (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
