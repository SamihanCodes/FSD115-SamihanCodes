import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";
import { getBuyersForListing } from "../api/messages";
import { useNavigate } from "react-router-dom";

const SellerChats = () => {
  const [listings, setListings] = useState([]);
  const [buyersMap, setBuyersMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getMyListings().then((res) => {
      setListings(res.data);

      // For each listing, load buyers
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
    <div className="container">
      <h2>Seller Chats</h2>

      {listings.length === 0 && <p>No listings found</p>}

      {listings.map((l) => (
        <div key={l.id} className="card">
          <h3>{l.animal_type}</h3>
          <p>Buyers who contacted you:</p>

          {buyersMap[l.id]?.length > 0 ? (
            buyersMap[l.id].map((buyer) => (
              <div
                key={buyer.id}
                style={{
                  cursor: "pointer",
                  padding: "6px",
                  borderBottom: "1px solid #e5e7eb",
                  color: "#16808D",
                }}
                onClick={() =>
                  navigate(`/chat/${l.id}?buyer=${buyer.id}`)
                }
              >
                {buyer.email}
              </div>
            ))
          ) : (
            <p style={{ color: "#94a3b8" }}>
              No chats yet for this listing
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SellerChats;
