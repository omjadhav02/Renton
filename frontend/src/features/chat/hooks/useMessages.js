import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getMessages } from "../services/chatService";
import socket from "../../../sockets/socket";
import axiosInstance from "../../../api/axios";

export const useMessages = (receiver) => {
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (!receiver || !user) return;

        const fetchMessages = async () => {
            try {
                const data = await getMessages(receiver.id);
                setMessages(data);
            } catch (err) {
                console.error("Fetch messages error:", err);
            }
        };

        fetchMessages();

        // mark messages as seen
        axiosInstance.put(`/chats/seen/${receiver.id}`).catch(() => {});

        // join room
        socket.emit("join", user.id);

        // receive message
        const handleMessage = (msg) => {
            if (
                msg.senderId === receiver.id ||
                msg.receiverId === receiver.id
            ) {
                setMessages((prev) => [...prev, msg]);
            }
        };

        // typing indicator
        const handleTyping = (senderId) => {
            if (senderId === receiver.id) {
                setIsTyping(true);
                setTimeout(() => setIsTyping(false), 1500);
            }
        };

        socket.on("receive_message", handleMessage);
        socket.on("user_typing", handleTyping);
        socket.on("online_users",(users) => {
            setOnlineUsers(users);
        })

        return () => {
            socket.off("receive_message", handleMessage);
            socket.off("user_typing", handleTyping);
            socket.off("online_users");
        };
    }, [receiver, user]);

    const sendMessage = (text) => {
        if (!receiver || !user || !text.trim()) return;

        const messageData = {
            senderId: user.id,
            receiverId: receiver.id,
            message: text,
        };

        socket.emit("send_message", messageData);
    };

    const emitTyping = () => {
        if (!receiver || !user) return;

        socket.emit("typing", {
            senderId: user.id,
            receiverId: receiver.id,
        });
    };

    return { messages, sendMessage, isTyping, emitTyping, onlineUsers };
};