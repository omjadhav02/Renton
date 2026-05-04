import axios from "axios";
import { OLLAMA_BASE_URL, MODEL } from "../config/ollama.js";

export const callOllama = async (messages) => {
    try {
        const response = await axios.post(`${OLLAMA_BASE_URL}/api/chat`, {
            model: MODEL1,
            messages,
            stream: false,
        });

        return response.data.message.content;

    } catch (error) {
        console.error("Error calling Ollama API:", error);
        throw error;
    }
};