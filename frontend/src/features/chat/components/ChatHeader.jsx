import { IoClose } from "react-icons/io5"

const ChatHeader = ({ user, onClose, onlineUsers }) => {
    
    const isOnline = onlineUsers?.includes(user.id);

    return(
        <div className="p-4 border-b flex justify-between items-center">
            
            <div>
                <h2 className="font-semibold">
                    {user.name}
                </h2>
                <p className="text-xs flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
                    {isOnline ? "Online" : "Offline"}
                </p>
            </div>

            <button onClick={onClose}>
                <IoClose size={20}/>
            </button>
        </div>
    )
}

export default ChatHeader;