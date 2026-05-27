import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../api/authApi"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export const useLogin = () => {
    
    const navigate = useNavigate();
    const { setUser } = useAuth();

    return useMutation({
        mutationFn: loginUser,

        onSuccess: (data) => {
            setUser(data.user);
            toast.success("Welcome back 👋");
            navigate("/")
        },

        onError: (error) => {
            const message = error?.response?.data?.message || "Invalid Credentials";
            toast.error(message)
        },
    })
}