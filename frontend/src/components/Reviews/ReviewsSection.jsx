import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { motion } from "framer-motion";

function ReviewsSection({ propertyId }) {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const res = await axiosInstance.get(`/reviews/property/${propertyId}`);
            setReviews(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [propertyId]);

    const handleNewReview = (review) => {
        setReviews(prev => [review, ...prev]);
    };

    const handleDelete = (id) => {
        setReviews(prev => prev.filter(r => r.id !== id));
    };

    const avgRating =
        reviews.length > 0
            ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

    return (
        <div className="mt-20">

            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-semibold">
                    Reviews
                </h2>
                {reviews.length > 0 && (
                    <span className="text-gray-600">
                        ⭐ {avgRating} ({reviews.length})
                    </span>
                )}
            </div>

            <ReviewForm
                propertyId={propertyId}
                onReviewAdded={handleNewReview}
            />

            {loading ? (
                <p className="mt-6">Loading...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500 mt-6">
                    No reviews yet
                </p>
            ) : (
                <motion.div
                    className="space-y-6 mt-8"
                    initial="hidden"
                    animate="visible"
                >
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