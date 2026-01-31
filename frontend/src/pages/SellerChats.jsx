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
    });
  }, []);

  const loadBuyers = async (listingId) => {
    const res = await getBuyersForListing(listingId);
    setBuyersMap((prev) => ({
      ...prev,
      [listingId]: res.data,
    }));
  };

  return (
    <div className="container">
      <h2>Seller Chats</h2>

      {listings.length === 0 && (
        <p>You have no listings.</p>
      )}

      {listings.map((l) => (
        <div key={l.id} className="card">
          <strong>{l.animal_type}</strong>
          <p>₹{l.price}</p>

          <button
            style={{ marginTop: "8px" }}
            onClick={() => loadBuyers(l.id)}
          >
            View Buyers
          </button>

          {/* BUYERS FOR THIS LISTING */}
          {buyersMap[l.id]?.map((b) => (
            <div
              key={b.id}
              style={{
                marginTop: "8px",
                padding: "8px",
                background: "#f1f5f9",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/chat/${l.id}/${b.id}`)
              }
            >
              {b.email}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SellerChats;
