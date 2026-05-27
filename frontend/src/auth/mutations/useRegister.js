import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";

export const useRegister = () => {

    const navigate = useNavigate();

    const registerMutation = useMutation({
      mutationFn: registerUser,

      onSuccess: (data) => {
        navigate("/login");
        toast.success("Account created 🎉")
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || "Invalid Credentials")
      }
    })

    return registerMutation;
}