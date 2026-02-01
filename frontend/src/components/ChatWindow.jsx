import { useEffect, useState } from "react";
import { sendMessage, getMessagesBetweenUsers } from "../api/messages";
import { useAuth } from "../context/AuthContext";

const ChatWindow = ({ listingId, receiverId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = () => {
    if (!listingId || !receiverId) return;

    getMessagesBetweenUsers(listingId, receiverId)
      .then((res) => setMessages(res.data));
  };

  useEffect(() => {
    fetchMessages();
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
          <div
            key={m.id}
            style={{
              textAlign: m.sender_id === user.id ? "right" : "left",
              marginBottom: "6px"
            }}
          >
            <strong>
              {m.sender_id === user.id ? "You" : m.sender_email}
            </strong>
            : {m.message}
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
