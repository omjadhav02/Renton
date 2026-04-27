import { IoClose } from "react-icons/io5"

const ChatHeader = ({ user, onClose, onlineUsers }) => {
    
    const isOnline = onlineUsers?.includes(user.id);

    return(
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">

  <div>
    <h2 className="font-semibold text-slate-900">
      {user.name}
    </h2>

    <p className="text-xs flex items-center gap-2 text-slate-500">
      <span className={`w-2 h-2 rounded-full ${
        isOnline ? "bg-green-500" : "bg-slate-400"
      }`} />
      {isOnline ? "Online" : "Offline"}
    </p>
  </div>

  <button
    onClick={onClose}
    className="text-slate-400 hover:text-slate-900 transition"
  >
    <IoClose size={20}/>
  </button>

</div>
    )
}

export default ChatHeader;