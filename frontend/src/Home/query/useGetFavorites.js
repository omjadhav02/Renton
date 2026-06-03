import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../api/favoriteApi";
import toast from "react-hot-toast";

export const useGetFavorites = () => {

    return useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
    });
};