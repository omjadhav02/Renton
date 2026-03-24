import axiosInstance from "../api/axios"

export const getAllProperties = async () => {
    try {
        const res = await axiosInstance.get("/properties");

        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch properties";
    }
    
}

export const searchProperties = (city) => {
    return axiosInstance.get(`/properties?city=${city}`);
}