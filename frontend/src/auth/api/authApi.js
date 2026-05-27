import axiosInstance from "../../api/axios"

export const loginUser = async (credentials) => {
    const { data } = await axiosInstance.post("/auth/login", credentials);

    return data;
}

export const registerUser = async (credentials) => {
    const { data } = await axiosInstance.post("/auth/register", credentials);

    return data;
}