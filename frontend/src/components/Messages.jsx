import { useEffect, useState } from "react";
import {
  getMessagesByListing,
  sendMessage,
  getBuyersForListing,
} from "../api/messages";
import { useAuth } from "../context/AuthContext";

const Messages = ({ listingId, sellerId, listingStatus }) => {
  const { user } = useAuth();

  const [buyers, setBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const chatLocked = listingStatus === "sold";

  //  Seller: load buyers list
  useEffect(() => {
    if (user?.role === "seller") {
      getBuyersForListing(listingId).then((res) =>
        setBuyers(res.data)
      );
    }
  }, [listingId, user]);

  //  Load messages
  const loadMessages = () => {
    let buyerId = null;

    if (user.role === "buyer") {
      buyerId = user.id;
    }

    if (user.role === "seller" && selectedBuyer) {
      buyerId = selectedBuyer.id;
    }

    if (!buyerId && user.role === "seller") return;

    getMessagesByListing(listingId, buyerId).then((res) =>
      setMessages(res.data)
    );
  };

  useEffect(() => {
    loadMessages();
  }, [listingId, selectedBuyer]);

  const receiver_id =
    user.role === "buyer"
      ? sellerId
      : selectedBuyer?.id;

  const handleSend = async () => {
    if (!text.trim()) return;

    if (!receiver_id) {
      alert("Select a buyer to reply");
      return;
    }

    try {
      await sendMessage({
        listing_id: listingId,
        receiver_id,
        message: text,
      });

      setText("");
      loadMessages();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to send message"
      );
    }
  };

  return (
    <div
      className="card"
      style={{
        display: "flex",
        gap: "16px",
        marginTop: "20px",
        minHeight: "300px",
      }}
    >
      {/*  SELLER SIDEBAR */}
      {user.role === "seller" && (
        <div
          style={{
            width: "30%",
            borderRight: "1px solid #e5e7eb",
            paddingRight: "10px",
          }}
        >
          <h4>Buyers</h4>

          {buyers.length === 0 && (
            <p style={{ color: "#64748b" }}>
              No chats yet
            </p>
          )}

          {buyers.map((b) => (
            <div
              key={b.id}
              onClick={() => setSelectedBuyer(b)}
              style={{
                padding: "8px",
                marginBottom: "6px",
                cursor: "pointer",
                borderRadius: "4px",
                backgroundColor:
                  selectedBuyer?.id === b.id
                    ? "#E6F6F8"
                    : "transparent",
              }}
            >
              {b.email}
            </div>
          ))}
        </div>
      )}

      {/*  CHAT WINDOW */}
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: "10px" }}>
          {user.role === "buyer"
            ? "Chat with Seller"
            : selectedBuyer
            ? `Chat with ${selectedBuyer.email}`
            : "Select a buyer"}
        </h4>

        {chatLocked && (
          <p style={{ color: "#EF4444" }}>
            Chat closed — listing sold
          </p>
        )}

        <div
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            marginBottom: "10px",
          }}
        >
          {messages.length === 0 && (
            <p style={{ color: "#64748b" }}>
              No messages yet
            </p>
          )}

          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: "10px" }}>
              <strong style={{ color: "#1B9AAA" }}>
                {m.sender_email}
              </strong>
              <div>{m.message}</div>
              <small style={{ color: "#64748b" }}>
                {new Date(m.created_at).toLocaleString()}
              </small>
            </div>
          ))}
        </div>

        <input
          value={text}
          disabled={chatLocked}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            chatLocked
              ? "Chat closed"
              : "Type your message"
          }
        />

        <button
          disabled={chatLocked}
          onClick={handleSend}
          style={{
            backgroundColor: chatLocked
              ? "#94a3b8"
              : "#16808D",
            marginTop: "6px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
