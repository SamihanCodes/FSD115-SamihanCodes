import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// ✅ IMPORT HERO IMAGE
import heroImage from "../assets/hero.jpg";

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

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* GLASS CARD */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(12px)",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#02394A",
            fontSize: "26px",
            fontWeight: 700,
          }}
        >
          Welcome Back
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#475569",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          Login to manage your LivestockHub account
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div
            style={{
              background: "#FEE2E2",
              color: "#991B1B",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <label style={{ fontWeight: 600 }}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "14px" }}
        />

        <label style={{ fontWeight: 600 }}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "18px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "15px",
            fontWeight: 600,
            borderRadius: "8px",
            background:
              "linear-gradient(135deg, #4C97A8, #02394A)",
            transition: "all 0.3s ease",
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            fontSize: "14px",
            color: "#334155",
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#1B9AAA",
              fontWeight: 600,
            }}
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
