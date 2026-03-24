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
        <div className="p-3 border-t flex gap-2">
            <input
                value={text}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter"){
                        e.preventDefault();
                        handleSend();
                    }
                }}
                placeholder="Type a message..."
                className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none"
            />

            <button
                onSubmit={handleSend}
                className="bg-black text-white px-4 rounded-xl"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;