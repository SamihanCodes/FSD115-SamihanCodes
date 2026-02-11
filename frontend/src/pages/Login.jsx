import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import heroImage from "../assets/hero.jpg";
import Footer from "../components/Footer";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid email or password");
      }
    }
  };

  const fillAdminCredentials = () => {
    setEmail("samihan@gmail.com");
    setPassword("123");
  };


  return (
    <>
      <div
        className="login-page"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p className="subtitle">
            Login to manage your LivestockHub account
          </p>

          {error && <div className="error-box">{error}</div>}

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>

          {/*ADMIN ACCESS BUTTON */}
          <button
          className="admin-access-btn"
            type="button"
            onClick={fillAdminCredentials}
          >
             Admin Access (Demo)
          </button>


          <p className="register-text">
            Don’t have an account?{" "}
            <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Login;
