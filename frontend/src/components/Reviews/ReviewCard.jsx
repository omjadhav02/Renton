import axiosInstance from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast"

function ReviewCard({ review, onDelete }) {

    const { user } = useAuth();

    const isOwner = user?.id === review.tenantId;

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/reviews/${review.id}`);
            onDelete(review.id);
            toast.success("Review Deleted!")
        } catch (error){
            console.error(error)
            toast.error("Review deletion failed!")
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white p-5 rounded-2xl border shadow-sm"
        >

            <div className="flex justify-between items-center">

                <div>
                    <p className="font-semibold text-gray-800">
                        {review.tenant?.name || "User"}
                    </p>

                    <div className="text-yellow-500 text-sm">
                        {"★".repeat(review.rating)}
                    </div>
                </div>

                {isOwner && (
                    <button
                        onClick={handleDelete}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Delete
                    </button>
                )}

            </div>

            <p className="text-gray-600 mt-3 leading-relaxed">
                {review.comment}
            </p>

        </motion.div>
    );
}

export default ReviewCard;