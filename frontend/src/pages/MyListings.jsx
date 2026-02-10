import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./MyListings.css";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyListings().then((res) => setListings(res.data));
  }, []);

  return (
    <>
      <div className="page-wrapper">
        {/* GLOBAL BACKGROUND */}
        <div className="page-pattern" />

        <div className="glass-box my-listings-page">
          <h1 className="page-title">My Listings</h1>
          <p className="page-subtitle">
            Manage and track your livestock listings
          </p>

          {listings.length === 0 && (
            <p className="empty-text">
              You have not created any listings yet.
            </p>
          )}

          <div className="listings-grid">
            {listings.map((l) => {
              const coverImage =
                Array.isArray(l.images) && l.images.length > 0
                  ? l.images[0]
                  : null;

              return (
                <div className="listing-card" key={l.id}>
                  {/* IMAGE */}
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt="livestock"
                      className="listing-image"
                    />
                  ) : (
                    <div className="listing-image placeholder">
                      No image uploaded
                    </div>
                  )}

                  {/* DETAILS */}
                  <h3 className="listing-title">
                    {l.animal_type}
                  </h3>

                  <p className="listing-price">
                    <strong>Price:</strong> ₹{l.price}
                  </p>

                  <span
                    className={`status-badge ${
                      l.status === "active"
                        ? "active"
                        : "sold"
                    }`}
                  >
                    {l.status === "active"
                      ? "Active"
                      : "Sold"}
                  </span>

                  {/* ACTIONS */}
                  {l.status === "active" && (
                    <div className="listing-actions">
                      <button
                        onClick={() =>
                          navigate(
                            `/listings/edit/${l.id}`
                          )
                        }
                      >
                        Edit Listing
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyListings;
