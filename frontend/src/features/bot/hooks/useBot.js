import { useEffect, useState } from "react";
import { chatBot } from "../services/botService";
import toast from "react-hot-toast";

export const useBot = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if(!input.trim()) return;

        const userMessage = { role: "user", content: input };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await chatBot(input, updatedMessages);

            const botMessage = {
                role: "assistant",
                content: res.reply,
            }

            setMessages([...updatedMessages, botMessage]);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    }

    return { input, setInput, messages, loading, sendMessage };
}