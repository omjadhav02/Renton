import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeFavorites } from "../api/favoriteApi"

export const useRemoveFav = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFavorites,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"]
            })
        },

        onError: (error) => {
            console.error(error);
        }
    })
}