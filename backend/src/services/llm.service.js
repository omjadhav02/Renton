import axios from "axios";
import { OLLAMA_BASE_URL, MODEL } from "../config/ollama.js";

export const callOllama = async (messages) => {
    try {
        const response = await axios.post(`${OLLAMA_BASE_URL}/api/chat`, {
            model: MODEL,
            messages,
            stream: false,
        });

        return response.data.message.content;

    } catch (error) {
        console.error("Ollama Error:", error?.response?.data || error.message);
        throw new Error("LLM request failed");
    }
}