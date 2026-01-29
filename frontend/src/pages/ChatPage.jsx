import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getMessagesByListing,
  sendMessage,
} from "../api/messages";

const ChatPage = () => {
  const { listingId } = useParams();
  const [params] = useSearchParams();
  const buyerId = params.get("buyer");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = () => {
    getMessagesByListing(listingId, buyerId).then((res) =>
      setMessages(res.data)
    );
  };

  useEffect(() => {
    fetchMessages();
  }, [listingId, buyerId]);

  const handleSend = async () => {
    if (!text.trim()) return;

    await sendMessage({
      listing_id: listingId,
      receiver_id: buyerId,
      message: text,
    });

    setText("");
    fetchMessages();
  };

  return (
    <div className="container">
      <h2>Chat</h2>

      <div className="card" style={{ minHeight: "300px" }}>
        {messages.map((m) => (
          <div key={m.id}>
            <strong>{m.sender_email}:</strong> {m.message}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
