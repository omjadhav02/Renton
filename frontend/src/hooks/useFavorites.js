import { useEffect, useState } from "react";
import { addFavorites, removeFavorites, getFavorites } from "../services/favoriteService";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const data = await getFavorites();
        
            setFavorites(data);
        } catch (error) {
            console.error(error);
        }
        
    }

    useEffect(() => {
        fetchFavorites();
    },[])

    const addFav = async (propertyId) => {
        try {
            const data = await addFavorites(propertyId);
            fetchFavorites();
        } catch (error) {
            console.error(error);
        }
        
    }
    const removeFav = async (id) => {
        try {
            const data = await removeFavorites(id);
            fetchFavorites();
        } catch (error) {
            console.error(error);
        }
        
    }

    const favIds = favorites.map((fav) => fav.propertyId);


  return { addFav, removeFav, favorites, favIds };
}