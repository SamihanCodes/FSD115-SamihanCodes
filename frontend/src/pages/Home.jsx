import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import cow from "../assets/cow.jpg";
import goat from "../assets/goat.jpg";
import sheep from "../assets/sheep.jpg";

const Home = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <div
        style={{
          height: "85vh",
          backgroundImage: `linear-gradient(rgba(2,57,74,0.7), rgba(2,57,74,0.7)), url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          padding: "40px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "56px", marginBottom: "16px" }}>
            LiveStockHub
          </h1>
          <p style={{ fontSize: "20px", maxWidth: "600px", margin: "0 auto" }}>
            India’s digital marketplace for buying and selling livestock.
            Smart. Secure. Transparent.
          </p>

          <div style={{ marginTop: "30px" }}>
            <Link to="/register">
              <button
                style={{
                  backgroundColor: "#22c55e",
                  fontSize: "16px",
                  padding: "12px 24px",
                }}
              >
                Get Started Free
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="container">
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Why LiveStockHub?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              title: "Verified Sellers",
              desc: "All sellers are authenticated for trust & safety.",
              icon: "✅",
            },
            {
              title: "Real-time Bidding",
              desc: "Transparent bidding system for fair pricing.",
              icon: "💰",
            },
            {
              title: "Direct Chat",
              desc: "Chat instantly with buyers & sellers.",
              icon: "💬",
            },
            {
              title: "Secure Payments",
              desc: "Safe transactions with invoices & records.",
              icon: "🔐",
            },
            {
              title: "Admin Monitoring",
              desc: "Platform monitored by admin for fraud prevention.",
              icon: "🛡️",
            },
            {
              title: "Digital Records",
              desc: "All bids, chats & invoices stored securely.",
              icon: "📊",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="card"
              style={{
                textAlign: "center",
                padding: "24px",
                transition: "0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-6px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ fontSize: "36px" }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p style={{ color: "#475569" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LIVESTOCK SHOWCASE */}
      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "60px 20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Trade All Kinds of Livestock
        </h2>

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {[
            { img: cow, name: "Cattle" },
            { img: goat, name: "Goats" },
            { img: sheep, name: "Sheep" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  padding: "12px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #02394A, #4C97A8)",
          color: "white",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h2>Ready to experience smart livestock trading?</h2>
        <p style={{ marginBottom: "20px" }}>
          Join thousands of farmers and buyers across India.
        </p>
        <Link to="/register">
          <button
            style={{
              backgroundColor: "#22c55e",
              fontSize: "16px",
            }}
          >
            Create Free Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
