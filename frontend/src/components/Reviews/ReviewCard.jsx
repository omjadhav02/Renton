import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

function ReviewCard({ review, onDelete }) {

    const { user } = useAuth();
    const isOwner = user?.id === review.tenantId;

    return (
        <motion.div
            className="backdrop-blur-xl bg-white/70 border border-white/40 p-5 rounded-3xl shadow-sm hover:shadow-md transition"
        >
            <div className="flex justify-between items-start">

                {/* USER INFO */}
                <div>
                    <p className="font-semibold text-gray-900">
                        {review.tenant?.name || "User"}
                    </p>

                    <div className="text-yellow-400 text-sm mt-1">
                        {"★".repeat(review.rating)}
                    </div>
                </div>

                {/* DELETE */}
                {isOwner && (
                    <button
                        onClick={() => onDelete(review.id)}
                        className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition"
                    >
                        Delete
                    </button>
                )}

            </div>

            {/* COMMENT */}
            <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                {review.comment}
            </p>
        </motion.div>
    );
}

export default ReviewCard;