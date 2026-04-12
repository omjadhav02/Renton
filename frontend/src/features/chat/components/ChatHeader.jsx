import { IoClose } from "react-icons/io5"

const ChatHeader = ({ user, onClose, onlineUsers }) => {
    
    const isOnline = onlineUsers?.includes(user.id);

    return(
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">

  <div>
    <h2 className="font-semibold text-white">
      {user.name}
    </h2>

    <p className="text-xs flex items-center gap-2 text-slate-400">
      <span className={`w-2 h-2 rounded-full ${
        isOnline ? "bg-emerald-400" : "bg-slate-500"
      }`} />
      {isOnline ? "Online" : "Offline"}
    </p>
  </div>

  <button
    onClick={onClose}
    className="text-slate-400 hover:text-white transition"
  >
    <IoClose size={20}/>
  </button>

</div>
    )
}

export default ChatHeader;