// hooks/useReview.js

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    createReview,
    deleteReview,
    getPropertyReviews
} from "../services/reviewService";
import toast from "react-hot-toast";

export const useReview = (propertyId, onReviewAdded, onDelete) => {

    const { user } = useAuth();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    // ✅ FETCH REVIEWS
    const fetchReviews = async () => {
        try {
            setLoading(true);
            const data = await getPropertyReviews(propertyId);
            setReviews(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (propertyId) fetchReviews();
    }, [propertyId]);

    // ✅ ADD REVIEW
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = await createReview(propertyId, rating, comment);

            setReviews(prev => [data, ...prev]);
            onReviewAdded && onReviewAdded(data);

            setComment("");
            setRating(5);

            toast.success("Review Added!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed");
        } finally {
            setLoading(false);
        }
    };

    // ✅ DELETE REVIEW
    const handleDelete = async (id) => {
        try {
            setLoading(true);

            await deleteReview(id);

            setReviews(prev => prev.filter(r => r.id !== id));
            onDelete && onDelete(id);

            toast.success("Review Deleted!");
        } catch (error) {
            toast.error("Review deletion failed!");
        } finally {
            setLoading(false);
        }
    };

    // ✅ AVG RATING
    const avgRating =
        reviews.length > 0
            ? (
                  reviews.reduce((acc, r) => acc + r.rating, 0) /
                  reviews.length
              ).toFixed(1)
            : 0;

    return {
        user,
        reviews,
        loading,
        rating,
        comment,
        setRating,
        setComment,
        handleSubmit,
        handleDelete,
        avgRating,
        setReviews
    };
};