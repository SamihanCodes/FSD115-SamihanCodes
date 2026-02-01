import { useParams, useSearchParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
const ChatPage = () => {
  const { listingId } = useParams();
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("seller") || searchParams.get("buyer");
  return (
    <div className="container">
      <h2>Chat</h2>
      <ChatWindow
        listingId={listingId}
        receiverId={receiverId}
      />
    </div>
  );
};
export default ChatPage;
