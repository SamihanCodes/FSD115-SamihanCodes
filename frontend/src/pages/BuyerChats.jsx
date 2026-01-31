import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBuyerChats } from "../api/messages";

const BuyerChats = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getBuyerChats().then((res) => {
      setChats(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h2>My Chats (Buyer)</h2>

      {chats.length === 0 && (
        <p>You have not started any chats yet.</p>
      )}

      {chats.map((c) => (
        <div
          key={`${c.listing_id}-${c.seller_id}`}
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate(`/chat/${c.listing_id}?seller=${c.seller_id}`)
          }
        >
          <strong>{c.animal_type}</strong> — ₹{c.price}
          <p>Seller: {c.seller_email}</p>
        </div>
      ))}
    </div>
  );
};

export default BuyerChats;
