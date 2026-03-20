import { useState } from "react";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import StarRating from "./StarRating";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ReviewForm({ propertyId, onReviewAdded }) {

    const { user } = useAuth();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post("/reviews", {
                propertyId,
                rating,
                comment
            });

            onReviewAdded(res.data);
            setComment("");
            setRating(5);

            toast.success("Review Added!")
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed");
        }
    };

    // 🔐 NOT LOGGED IN
    if (!user) {
        return (
            <div className="bg-gray-50 p-6 rounded-xl  text-center">
                <p className="text-gray-600">
                    Please login to write a review
                </p>
            </div>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-sm border"
        >

            <h3 className="font-semibold mb-4 text-lg">
                Write a Review
            </h3>

            <div className="flex flex-col gap-4">

                <StarRating rating={rating} setRating={setRating} />

                <textarea
                    placeholder="Share your experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="bg-black text-white py-2 rounded-xl hover:opacity-90 transition"
                >
                    Submit Review
                </button>

            </div>

        </motion.form>
    );
}

export default ReviewForm;