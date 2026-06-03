import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addFavorites } from "../api/favoriteApi"
import toast from "react-hot-toast";

export const useAddFav = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addFavorites,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            })
        },

        onError: (error) => {
            const message = error?.response?.data?.message || "Failed to add Favorites"
            toast.error(message);
        }
    })
}