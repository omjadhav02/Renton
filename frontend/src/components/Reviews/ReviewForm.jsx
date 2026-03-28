import StarRating from "./StarRating";
import { motion } from "framer-motion";

function ReviewForm({ user, handleSubmit, rating, comment, setRating, setComment }) {

    if (!user) {
        return (
            <div className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-2xl text-center">
                <p className="text-gray-600 text-sm">
                    Please login to write a review
                </p>
            </div>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="backdrop-blur-xl bg-white/70 border border-white/40 p-6 rounded-3xl shadow-sm space-y-5"
        >
            <h3 className="font-semibold text-lg text-gray-900">
                Write a Review
            </h3>

            <StarRating rating={rating} setRating={setRating} />

            <textarea
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/80 border border-gray-200 focus:ring-2 focus:ring-black outline-none text-sm"
                rows={4}
            />

            <button
                type="submit"
                className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-black to-gray-800 text-white hover:scale-[1.02] active:scale-[0.98] transition"
            >
                Submit Review
            </button>
        </motion.form>
    );
}

export default ReviewForm;