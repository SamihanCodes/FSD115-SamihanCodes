import { useEffect, useState } from "react";
import { getMyListings } from "../api/listings";
import { getBuyersForListing } from "../api/messages";
import { useNavigate } from "react-router-dom";

const SellerChats = () => {
  const [listings, setListings] = useState([]);
  const [buyersMap, setBuyersMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getMyListings().then(async (res) => {
      const sellerListings = res.data;
      setListings(sellerListings);

      // fetch buyers for each listing
      const map = {};
      for (let l of sellerListings) {
        const buyersRes = await getBuyersForListing(l.id);
        map[l.id] = buyersRes.data;
      }
      setBuyersMap(map);
    });
  }, []);

  return (
    <div className="container">
      <h2>Seller Chats</h2>

      {listings.map((l) => (
        <div key={l.id} className="card">
          <h3>{l.animal_type}</h3>

          {buyersMap[l.id]?.length > 0 ? (
            buyersMap[l.id].map((b) => (
              <div key={b.id} style={{ marginTop: "6px" }}>
                <button
                  onClick={() =>
                    navigate(`/chat/${l.id}?buyer=${b.id}`)
                  }
                >
                  Chat with {b.email}
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: "#64748b" }}>
              No buyers yet
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SellerChats;
