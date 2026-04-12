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
        <div className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">

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
    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />

  <button
    onClick={handleSend}
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-xl font-medium transition"
  >
    Send
  </button>

</div>
    );
};

export default ChatInput;