import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";
import { useNavigate } from "react-router-dom";
import Messages from "../components/Messages";

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

      {listings.map((l) => (
        <div className="card" key={l.id}>
          <h3 style={{ color: "#142C52", marginBottom: "6px" }}>
            {l.animal_type}
          </h3>

          <p style={{ marginBottom: "4px" }}>
            <strong>Price:</strong> ₹{l.price}
          </p>

          <p style={{ marginBottom: "10px" }}>
            <strong>Status:</strong>{" "}
            {l.status === "active" ? (
              <span style={{ color: "#22C55E" }}>Active</span>
            ) : (
              <span style={{ color: "#EF4444" }}>Sold</span>
            )}
          </p>

          {/* ✏️ EDIT LISTING */}
          {l.status === "active" && (
            <button
              onClick={() => navigate(`/listings/edit/${l.id}`)}
              style={{
                backgroundColor: "#16808D",
                padding: "6px 12px",
                marginBottom: "10px",
              }}
            >
              Edit Listing
            </button>
          )}

          {/* 💬 SELLER MESSAGE PANEL */}
          <div style={{ marginTop: "10px" }}>
            <Messages listingId={l.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyListings;
