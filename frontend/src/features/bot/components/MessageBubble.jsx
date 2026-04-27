const MessageBubble = ({ msg }) => {
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-[75%] px-4 py-3 text-lg leading-relaxed transition-all duration-200
        ${
          isUser
            ? "bg-indigo-600 text-white rounded-2xl rounded-br-md shadow-md"
            : "bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-bl-md shadow-lg"
        }`}
      >
        {msg.content}
      </div>

    </div>
  );
};

export default MessageBubble;