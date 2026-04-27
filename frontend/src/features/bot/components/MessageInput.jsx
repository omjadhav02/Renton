const MessageInput = ({ input, setInput, sendMessage, loading }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200">

      <div className="flex items-center gap-3 bg-slate-100 border border-slate-200 rounded-full px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          className="flex-1 bg-transparent text-lg text-slate-900 placeholder-slate-400 outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 shadow-sm"
        >
          Send
        </button>

      </div>

    </div>
  );
};

export default MessageInput;