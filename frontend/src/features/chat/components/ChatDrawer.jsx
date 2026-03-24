import { motion, AnimatePresence } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useMessages } from "../hooks/useMessages";

const ChatDrawer = ({ isOpen, onClose, user }) => {
    const { messages, sendMessage, isTyping, emitTyping, onlineUsers } = useMessages(user);

    if (!user) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/10 backdrop-sm z-[90]"
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed right-0 top-16 h-[calc(100%-4rem)] w-[380px] bg-white shadow-2xl z-[100] flex flex-col"
                    >
                        <ChatHeader user={user} onClose={onClose} onlineUsers={onlineUsers}/>

                        <ChatMessages messages={messages} isTyping={isTyping} />

                        <ChatInput onSend={sendMessage} onTyping={emitTyping} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ChatDrawer;