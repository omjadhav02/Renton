import { useAuth } from "../../../context/AuthContext";
import { useEffect, useRef } from "react";

const ChatMessages = ({ messages, isTyping }) => {
    const { user } = useAuth();
    const bottomRef = useRef();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    if (!user) return null;

    return (
       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">

  {messages.map((msg) => {
    const isMe = msg.senderId === user.id;

    return (
      <div
        key={msg.id}
        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] relative
          ${
            isMe
              ? "bg-emerald-600 text-white"
              : "bg-slate-800 text-slate-200 border border-slate-700"
          }`}
        >
          {msg.message}

          {/* time */}
          <div className="text-[10px] mt-1 opacity-70 text-right">
            {msg.createdAt
              ? new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </div>

          {/* seen */}
          {isMe && (
            <div className="text-[10px] opacity-70 text-right">
              {msg.seen ? "Seen" : "Sent"}
            </div>
          )}
        </div>
      </div>
    );
  })}

  <div ref={bottomRef} />

  {isTyping && (
    <div className="text-xs text-slate-400 px-2 animate-pulse">
      Typing...
    </div>
  )}
</div>
    );
};

export default ChatMessages;