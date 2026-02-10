import { useEffect, useState } from "react";
import { searchListings } from "../api/listings";
import { createInterest } from "../api/interests";
import { placeBid } from "../api/bids";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Listings.css";

const Listings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    animal_type: "",
    minPrice: "",
    maxPrice: "",
  });
  const [bidAmounts, setBidAmounts] = useState({});
  const [lightboxImage, setLightboxImage] = useState(null);

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

  const startChat = (sellerId, listingId) => {
    navigate(`/chat/${listingId}?seller=${sellerId}`);
  };

  return (
    <>
      <div className="page-wrapper listings-page">
        {/* BACKGROUND PATTERN */}
        <div className="pattern-bg" />

        <div className="glass-box listings-container">
          {/* HEADING */}
          <h1 className="page-title">Available Listings</h1>
          <p className="page-subtitle">
            Browse, bid, and connect with livestock sellers
          </p>

          {/* FILTER BAR */}
          <div className="filter-card">
            <h3>Search & Filter</h3>

            <input
              name="animal_type"
              placeholder="Animal Type"
              value={filters.animal_type}
              onChange={handleFilterChange}
            />

            <div className="price-row">
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

            <button onClick={fetchListings}>
              Apply Filters
            </button>
          </div>

          {listings.length === 0 && (
            <p className="empty-text">No listings found</p>
          )}

          {/* LISTINGS */}
          <div className="listings-grid">
            {listings.map((l) => (
              <div className="listing-card" key={l.id}>
                {/* IMAGES */}
                {Array.isArray(l.images) && l.images.length > 0 ? (
                  <div className="image-grid">
                    {l.images.map((img, i) => (
                      <div
                        key={i}
                        className="image-box"
                        onClick={() => setLightboxImage(img)}
                      >
                        <img src={img} alt="livestock" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="muted-text">No images uploaded</p>
                )}

                {/* DETAILS */}
                <h3>{l.animal_type}</h3>
                <p><strong>Price:</strong> ₹{l.price}</p>
                <p className="desc">{l.description}</p>

                <p className="highest-bid">
                  <strong>Highest Bid:</strong>{" "}
                  {l.highest_bid > 0 ? `₹${l.highest_bid}` : "No bids yet"}
                </p>

                {/* ACTIONS */}
                {user?.role === "buyer" && (
                  <div className="action-block">
                    <button
                      className="secondary"
                      onClick={() => createInterest(l.id)}
                    >
                      I’m Interested
                    </button>

                    <div className="bid-row">
                      <input
                        type="number"
                        placeholder="Your bid"
                        value={bidAmounts[l.id] || ""}
                        onChange={(e) =>
                          handleBidChange(l.id, e.target.value)
                        }
                      />
                      <button onClick={() => handlePlaceBid(l.id)}>
                        Place Bid
                      </button>
                    </div>

                    <button
                      className="outline"
                      onClick={() => startChat(l.seller_id, l.id)}
                    >
                      Chat with Seller
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div
          className="lightbox"
          onClick={() => setLightboxImage(null)}
        >
          <img src={lightboxImage} alt="fullscreen" />
        </div>
      )}

      <Footer />
    </>
  );
};

export default Listings;
