import { useEffect, useRef, useState } from "react";
import { sendMessage, getMessagesBetweenUsers } from "../api/messages";
import { useAuth } from "../context/AuthContext";

const ChatWindow = ({ listingId, receiverId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const fetchMessages = () => {
    if (!listingId || !receiverId) return;

    getMessagesBetweenUsers(listingId, receiverId)
      .then((res) => setMessages(res.data));
  };

  useEffect(() => {
    fetchMessages();
  }, [listingId, receiverId]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div
      style={{
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 18px",
          background: "linear-gradient(135deg, #02394A, #4C97A8)",
          color: "white",
          fontWeight: "600",
          letterSpacing: "0.3px",
        }}
      >
        💬 LiveStockHub Chat
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "18px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          background:
            "linear-gradient(135deg, #f8fafc, #e2f3f8)",
        }}
      >
        {messages.map((m) => {
          const isMe = m.sender_id === user.id;

          return (
            <div
              key={m.id}
              style={{
                alignSelf: isMe ? "flex-end" : "flex-start",
                background: isMe
                  ? "linear-gradient(135deg, #4C97A8, #02394A)"
                  : "#ffffff",
                color: isMe ? "white" : "#071426",
                padding: "10px 14px",
                borderRadius: "16px",
                maxWidth: "70%",
                fontSize: "14px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  opacity: 0.7,
                  marginBottom: "2px",
                }}
              >
                {isMe ? "You" : m.sender_email}
              </div>
              {m.message}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          padding: "12px",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "999px",
            border: "1px solid #e5e7eb",
            outline: "none",
            fontSize: "14px",
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          style={{
            marginLeft: "10px",
            background:
              "linear-gradient(135deg, #25d366, #16a34a)",
            color: "white",
            border: "none",
            borderRadius: "999px",
            padding: "0 22px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
