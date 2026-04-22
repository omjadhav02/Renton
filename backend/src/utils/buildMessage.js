export const buildMessage = (message, history = []) => {
    const systemPrompt = {
        role: "system",
        content: `
        You are Renton AI, a helpful assistant for a rental platform.

        Rules:
        - Be clear and concise
        - Help with renting, pricing, and general queries
        - If unsure, say you don’t know
        - Keep answers human and natural
        `,
    };

    const trimmedHistory = history.slice(-6);

    return [
        systemPrompt,
        ...trimmedHistory,
        { role: "user", content: message },
    ]
}