import axiosInstance from "../api/axios"

export const addFavorites = async (propertyId) => {
    const res = await axiosInstance.post(`/favorites`,{
        propertyId
    })
    return res.data;
}

export const getFavorites = async () => {
    const res = await axiosInstance.get("/favorites");

    return res.data;
}

export const removeFavorites = async (id) => {
    const res = await axiosInstance.delete(`/favorites/${id}`);

    return res.data;
}