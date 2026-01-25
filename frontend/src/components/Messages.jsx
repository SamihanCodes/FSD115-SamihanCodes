import { useEffect, useState } from "react";
import {
  sendMessage,
  getMessagesByListing,
} from "../api/messages";
import { useAuth } from "../context/AuthContext";

const Messages = ({ listingId, receiverId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    const res = await getMessagesByListing(listingId);
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, [listingId]);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await sendMessage({
        listing_id: listingId,
        receiver_id: receiverId,
        message: text,
      });

      setText("");
      fetchMessages();
    } catch (err) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="card" style={{ marginTop: "10px" }}>
      <h4>Chat</h4>

      <div style={{ maxHeight: "150px", overflowY: "auto" }}>
        {messages.map((m) => (
          <p key={m.id}>
            <strong>
              {m.sender_id === user.id ? "You" : m.sender_email}:
            </strong>{" "}
            {m.message}
          </p>
        ))}
      </div>

      <input
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        style={{ marginTop: "6px", backgroundColor: "#16808D" }}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default Messages;
