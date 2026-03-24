import { useState } from "react";

export const useChat = () => {
    const [chatUser, setChatUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openChat = (user) => {
        setChatUser(user);
        setIsOpen(true);
    }

    const closeChat = () => {
        setIsOpen(false);
        setChatUser(null);
    }

    return { chatUser, isOpen, openChat, closeChat };
}