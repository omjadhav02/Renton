const MessageInput = ({ input, setInput, sendMessage, loading }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault(); // prevents newline / form submit issues
      sendMessage();
    }
  };

  return (
    <div className="p-4 bg-white border-t flex items-center gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something..."
        className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;