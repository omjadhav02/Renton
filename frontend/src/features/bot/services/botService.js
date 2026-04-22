import axiosInstance from "../../../api/axios.js";

export const chatBot = async (message, history) => {
    const { data } = await axiosInstance.post("/bot", {message, history});

    return data;
}