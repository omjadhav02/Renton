import axiosInstance from "../api/axios"

export const getAllProperties = async () => {
    try {
        const res = await axiosInstance.get("/properties");

        return res.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch properties";
    }
    
}

export const searchProperties = async(filters) => {
    const res = await axiosInstance.get("/properties/search",{
        params: filters,
    });

    return res.data;
}

export const createProperty = async (form) => {
    const res = await axiosInstance.post("/properties",form);

    return res.data;
}

export const getPropertyById = async (id) => {
    const res = await axiosInstance.get(`/properties/${id}`);

    return res.data;
}

export const updateProperty = async (id, form) => {
    const res = await axiosInstance.put(`/properties/${id}`,form);
    
    return res.data;
}

export const deleteProperty = async (id) => {
    const res = await axiosInstance.delete(`/properties/${id}`);

    return res.data;
}

