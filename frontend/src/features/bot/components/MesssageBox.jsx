import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const MessageBox = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, i) => (
        <MessageBubble key={i} msg={msg} />
      ))}

      {loading && (
        <div className="text-gray-500 text-sm">Typing...</div>
      )}

      {/* Auto-scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageBox;