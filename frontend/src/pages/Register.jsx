import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// ✅ HERO IMAGE
import heroImage from "../assets/hero.jpg";

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", formData);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          maxWidth: "440px",
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(12px)",
          padding: "32px",
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
          Create Your Account
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#475569",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          Join LiveStockHub as a buyer or seller
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

        <label style={{ fontWeight: 600 }}>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginBottom: "14px" }}
        />

        <label style={{ fontWeight: 600 }}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginBottom: "14px" }}
        />

        <label style={{ fontWeight: 600 }}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ marginBottom: "14px" }}
        />

        <label style={{ fontWeight: 600 }}>Register As</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

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
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            fontSize: "14px",
            color: "#334155",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#1B9AAA",
              fontWeight: 600,
            }}
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
