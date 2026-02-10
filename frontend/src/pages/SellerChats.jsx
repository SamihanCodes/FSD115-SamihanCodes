import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";
import { getBuyersForListing } from "../api/messages";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./SellerChats.css";

const SellerChats = () => {
  const [listings, setListings] = useState([]);
  const [buyersMap, setBuyersMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getMyListings().then((res) => {
      setListings(res.data);

      res.data.forEach((listing) => {
        getBuyersForListing(listing.id).then((r) => {
          setBuyersMap((prev) => ({
            ...prev,
            [listing.id]: r.data,
          }));
        });
      });
    });
  }, []);

  return (
    <>
      <div className="page-wrapper">
        {/* GLOBAL BACKGROUND */}
        <div className="page-pattern" />

        <div className="glass-box seller-chats-page">
          <h1 className="page-title">Seller Chats</h1>
          <p className="page-subtitle">
            Buyers who have contacted you for your listings
          </p>

          {listings.length === 0 && (
            <p className="empty-text">
              No listings found
            </p>
          )}

          <div className="listing-chat-list">
            {listings.map((l) => (
              <div key={l.id} className="listing-card">
                <h3 className="listing-title">
                  {l.animal_type}
                </h3>

                <p className="listing-subtitle">
                  Interested buyers:
                </p>

                {buyersMap[l.id]?.length > 0 ? (
                  <div className="buyer-list">
                    {buyersMap[l.id].map((buyer) => (
                      <div
                        key={buyer.id}
                        className="buyer-item"
                        onClick={() =>
                          navigate(
                            `/chat/${l.id}?buyer=${buyer.id}`
                          )
                        }
                      >
                        {buyer.email}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-text small">
                    No chats yet for this listing
                  </p>
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

export default SellerChats;
