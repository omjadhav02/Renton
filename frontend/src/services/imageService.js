import axiosInstance from "../api/axios"

export const uploadPropertyImages = async (id, form) => {
    const res = await axiosInstance.post(`/upload/property/${id}`, form);
    return res.data;
}

export const deletePropertyImage = async (id) => {
    const res = await axiosInstance.delete(`/upload/image/${id}`);
    return res.data;
}