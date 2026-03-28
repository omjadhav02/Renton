import axiosInstance from "../api/axios"


export const deleteReview = async (id) => {
    const res = await axiosInstance.delete(`/reviews/${id}`);

    return res.data;
}

export const getPropertyReviews = async (propertyId) => {
    const res = await axiosInstance.get(`/reviews/property/${propertyId}`);
    
    return res.data;
}

export const createReview = async ( propertyId, rating, comment) => {
    const res = await axiosInstance.post(`/reviews`,{propertyId, rating, comment});

    return res.data;
}