import { useEffect, useState } from "react";
import { useGetFavorites } from "../query/useGetFavorites";
import { useAddFav } from "../mutations/useAddFav";
import { useRemoveFav } from "../mutations/useRemoveFav";

export const useFavorites = () => {
    
    const { data: favorites = [] } = useGetFavorites();
    const { mutate: addFav } = useAddFav();
    const { mutate: removeFav } = useRemoveFav();


    const favIds = favorites.map((fav) => fav.propertyId);


  return { addFav, removeFav, favorites, favIds };
}