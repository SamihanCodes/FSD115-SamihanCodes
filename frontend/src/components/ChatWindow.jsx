import { useEffect, useState } from "react";
import { sendMessage, getMessagesByListing } from "../api/messages";
import { useAuth } from "../context/AuthContext";

const ChatWindow = ({ listingId, receiverId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = () => {
    getMessagesByListing(listingId, receiverId).then((res) =>
      setMessages(res.data)
    );
  };

  useEffect(() => {
    if (listingId) fetchMessages();
  }, [listingId, receiverId]);

  const handleSend = async () => {
    if (!text.trim()) return;

    await sendMessage({
      listing_id: listingId,
      receiver_id: receiverId,
      message: text,
    });

    setText("");
    fetchMessages();
  };

  return (
    <div>
      <div className="card" style={{ minHeight: 300 }}>
        {messages.map((m) => (
          <div key={m.id}>
            <strong>{m.sender_email}</strong>: {m.message}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
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

export default ChatWindow;
