const MessageBubble = ({ msg }) => {
  const isUser = msg.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm shadow
        ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
};

export default MessageBubble;