import { callOllama } from "../services/llm.service.js";
import { buildMessage } from "../utils/buildMessage.js";


export const chatBot = async (req, res) => {
    try {
        const { message, history } = req.body;

        if(!message) {
            return res.status(400).json({ error: "Message is required"});
        }

        const messages = buildMessage(message, history);

        const reply = await callOllama(messages);

        res.json({ reply });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}