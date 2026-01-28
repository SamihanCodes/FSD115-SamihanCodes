import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyListings().then((res) => setListings(res.data));
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px", color: "#142C52" }}>
        My Listings
      </h2>

      {listings.length === 0 && (
        <p style={{ color: "#475569" }}>
          You have not created any listings yet.
        </p>
      )}

      {listings.map((l) => {
        const coverImage =
          Array.isArray(l.images) && l.images.length > 0
            ? l.images[0]
            : null;

        return (
          <div className="card" key={l.id}>
            {/* 🖼️ COVER IMAGE */}
            {coverImage ? (
              <img
                src={coverImage}
                alt="livestock"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "12px",
                }}
              />
            ) : (
              <div
                style={{
                  height: "180px",
                  backgroundColor: "#f1f5f9",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                  color: "#64748b",
                }}
              >
                No image uploaded
              </div>
            )}

            {/* 📄 DETAILS */}
            <h3 style={{ color: "#142C52", marginBottom: "6px" }}>
              {l.animal_type}
            </h3>

            <p style={{ marginBottom: "6px" }}>
              <strong>Price:</strong> ₹{l.price}
            </p>

            {/* 🟢 STATUS BADGE */}
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: "999px",
                fontSize: "13px",
                marginBottom: "12px",
                backgroundColor:
                  l.status === "active" ? "#DCFCE7" : "#FEE2E2",
                color:
                  l.status === "active" ? "#166534" : "#991B1B",
              }}
            >
              {l.status === "active" ? "Active" : "Sold"}
            </span>

            {/* ✏️ EDIT BUTTON */}
            {l.status === "active" && (
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => navigate(`/listings/edit/${l.id}`)}
                  style={{
                    backgroundColor: "#16808D",
                    padding: "6px 14px",
                  }}
                >
                  Edit Listing
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyListings;
