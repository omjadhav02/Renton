import axiosInstance from "../../../api/axios"

export const getMessages = async (userId) => {
    const res = await axiosInstance.get(`chats/${userId}`);
    return res.data;
}