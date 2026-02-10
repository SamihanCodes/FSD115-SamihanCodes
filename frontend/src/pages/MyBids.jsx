import { useEffect, useState } from "react";
import { getMyBids } from "../api/bids";
import api from "../api/axios";
import Footer from "../components/Footer";
import "./MyBids.css";

const MyBids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    getMyBids().then((res) => setBids(res.data));
  }, []);

  const handleAcceptBid = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/accept`);
      alert("Bid accepted successfully");
      window.location.reload();
    } catch {
      alert("Failed to accept bid");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="page-pattern" />

        <div className="mybids-container glass-box">
          {/* HEADING */}
          <h1 className="page-title">
            Bids on My Listings
          </h1>

          <p className="page-subtitle">
            Review bids placed by buyers and accept the best offer.
          </p>

          {bids.length === 0 && (
            <p className="empty-text">
              No bids have been placed yet.
            </p>
          )}

          <div className="bids-grid">
            {bids.map((b) => (
              <div className="bid-card" key={b.id}>
                <h3 className="animal-title">
                  {b.animal_type}
                </h3>

                <p>
                  <strong>Listing Price:</strong> ₹{b.listing_price}
                </p>

                <p>
                  <strong>Bid Amount:</strong>{" "}
                  <span className="bid-amount">
                    ₹{b.amount}
                  </span>
                </p>

                <p>
                  <strong>Buyer Email:</strong>{" "}
                  <span className="buyer-email">
                    {b.buyer_email}
                  </span>
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {b.status === "pending" ? (
                    <span className="status pending">Pending</span>
                  ) : (
                    <span className="status accepted">Accepted</span>
                  )}
                </p>

                {b.status === "pending" && (
                  <button
                    className="accept-btn"
                    onClick={() => handleAcceptBid(b.id)}
                  >
                    Accept Bid
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyBids;
