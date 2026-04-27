import { useRef } from "react";
import MessageBubble from "./MessageBubble";

const MessageBox = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  const isEmpty = !messages.length;

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6">

      {isEmpty ? (
        <div className="h-full flex items-center justify-center text-center">
          <div>
            <p className="text-slate-400 text-base md:text-lg">
              Ask me anything. I'm here to help! 😊
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}

          {loading && (
            <div className="text-sm text-slate-400 animate-pulse px-1">
              Assistant is typing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}

    </div>
  );
};

export default MessageBox;