import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { motion } from "framer-motion";
import { useReview } from "../../hooks/useReview";

function ReviewsSection({ propertyId }) {
    const {
        reviews,
        loading,
        avgRating,
        handleDelete,
        handleSubmit,
        rating,
        comment,
        setRating,
        setComment,
        user
    } = useReview(propertyId);

    return (
        <div className="mt-20">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">

                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Reviews
                    </h2>

                    {reviews.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                            ⭐ {avgRating} · {reviews.length} reviews
                        </p>
                    )}
                </div>

            </div>

            {/* FORM */}
            <ReviewForm 
                handleSubmit={handleSubmit}
                rating={rating}
                comment={comment}
                setRating={setRating}
                setComment={setComment}
                user={user}
            />

            {/* LIST */}
            {loading ? (
                <p className="mt-6 text-gray-500">Loading reviews...</p>
            ) : reviews.length === 0 ? (
                <div className="mt-8 p-6 rounded-2xl bg-gray-50 text-center">
                    <p className="text-gray-500">
                        No reviews yet
                    </p>
                </div>
            ) : (
                <motion.div className="space-y-6 mt-10">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onDelete={handleDelete}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export default ReviewsSection;