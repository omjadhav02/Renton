import { useState } from "react";

const ChatInput = ({ onSend, onTyping }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (typeof onSend !== "function") return;
        if (!text.trim()) return;

        onSend(text);
        setText("");
    };

    const handleChange = (e) => {
        setText(e.target.value);

        if (typeof onTyping === "function") {
            onTyping();
        }
    };

    return (
        <div className="p-3 border-t border-slate-200 bg-white flex gap-2">

  <input
    value={text}
    onChange={handleChange}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    }}
    placeholder="Type a message..."
    className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />

  <button
    onClick={handleSend}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-xl font-medium transition"
  >
    Send
  </button>

</div>
    );
};

export default ChatInput;