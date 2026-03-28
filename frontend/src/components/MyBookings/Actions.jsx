import { IoCallOutline, IoChatbubbleEllipsesOutline, IoMailOutline, IoMailSharp, IoSendSharp, IoTrash } from "react-icons/io5";


const Actions = ({booking, owner, onDelete, onChat }) => {

    return (
        <div className="mt-4 space-y-4">

            {/* APPROVED */}
            {booking.status === "approved" && owner && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-gray-50 to-white space-y-5">

                {/* HEADER */}
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-black text-white">
                    <IoChatbubbleEllipsesOutline />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                        Communication Hub
                    </h3>
                </div>

                {/* CONTACT */}
                <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium">
                        Contact
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {owner.phone && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 font-medium hover:shadow-md transition cursor-pointer">
                                <IoCallOutline className="text-green-600" />
                                {owner.phone}
                            </div>
                        )}

                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 font-medium hover:shadow-md transition cursor-pointer">
                            <IoMailOutline className="text-blue-600" />
                            {owner.email}
                        </div>
                    </div>
                </div>
                {/* EMAIL ACTIONS */}
                <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium">
                        Email Actions
                    </p>
                    <div className="flex gap-3 flex-wrap">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition">
                                    <IoSendSharp/>
                                    Mail Owner 
                        </button>
                    </div>    
                </div>

                {/* CHAT */}
                <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium">
                        Message
                    </p>

                    <button
                        onClick={() => onChat(owner)}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-black to-gray-800 text-white font-medium hover:scale-[1.02] transition"
                    >
                        <IoChatbubbleEllipsesOutline />
                        Chat
                    </button>
                </div>

            </div>
            )}

            {/* CANCELLED */}
            {booking.status === "cancelled" && (
                <div>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-red-50 text-red-500 hover:bg-red-100 transition"
                    onClick={() => onDelete(booking.id)}>
                        <IoTrash/>Remove
                    </button>
                </div>
            )}
        </div>
    )
}

export default Actions;