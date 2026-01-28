import { useEffect, useState } from "react";
import { searchListings } from "../api/listings";
import { createInterest } from "../api/interests";
import { placeBid } from "../api/bids";
import { useAuth } from "../context/AuthContext";
import Messages from "../components/Messages"; // ✅ RESTORED

const Listings = () => {
  const { user } = useAuth();

  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    animal_type: "",
    minPrice: "",
    maxPrice: "",
  });
  const [bidAmounts, setBidAmounts] = useState({});

  const fetchListings = () => {
    searchListings(filters).then((res) => setListings(res.data));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBidChange = (id, value) => {
    setBidAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handlePlaceBid = async (id) => {
    if (!bidAmounts[id] || Number(bidAmounts[id]) <= 0) {
      alert("Enter a valid bid amount");
      return;
    }

    try {
      await placeBid(id, bidAmounts[id]);
      alert("Bid placed successfully");
      fetchListings();
    } catch (err) {
      alert(err.response?.data?.message || "Bid failed");
    }
  };

  return (
    <div className="container">
      <h2 style={{ color: "#142C52", marginBottom: "16px" }}>
        Available Listings
      </h2>

      {/* 🔍 FILTER BAR */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h3>Search & Filter</h3>

        <input
          name="animal_type"
          placeholder="Animal Type"
          value={filters.animal_type}
          onChange={handleFilterChange}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>

        <button
          style={{ marginTop: "10px", backgroundColor: "#16808D" }}
          onClick={fetchListings}
        >
          Apply Filters
        </button>
      </div>

      {/* 📦 LISTINGS */}
      {listings.length === 0 && <p>No listings found</p>}

      {listings.map((l) => (
        <div className="card" key={l.id}>
          {/* 🖼️ IMAGES */}
          {l.images?.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              {l.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="livestock"
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
          ) : (
            <p style={{ color: "#94a3b8" }}>No images uploaded</p>
          )}

          {/* 📄 DETAILS */}
          <h3 style={{ color: "#1B9AAA" }}>{l.animal_type}</h3>
          <p><strong>Price:</strong> ₹{l.price}</p>
          <p>{l.description}</p>

          <p>
            <strong>Highest Bid:</strong>{" "}
            {l.highest_bid > 0 ? `₹${l.highest_bid}` : "No bids yet"}
          </p>

          {/* ❤️ INTEREST */}
          {user?.role === "buyer" && (
            <button onClick={() => createInterest(l.id)}>
              I’m Interested
            </button>
          )}

          {/* 💰 BID */}
          {user?.role === "buyer" && (
            <div style={{ marginTop: "10px" }}>
              <input
                type="number"
                placeholder="Enter your bid"
                value={bidAmounts[l.id] || ""}
                onChange={(e) =>
                  handleBidChange(l.id, e.target.value)
                }
              />
              <button
                style={{ marginLeft: "8px" }}
                onClick={() => handlePlaceBid(l.id)}
              >
                Place Bid
              </button>
            </div>
          )}

          {/* 💬 CHAT — RESTORED */}
          {user && (
            <div style={{ marginTop: "16px" }}>
              <Messages
                listingId={l.id}
                listingStatus={l.status}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Listings;
