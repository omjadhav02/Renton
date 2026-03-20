import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function Favorites() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            
            const res = await axiosInstance.get("/favorites");

            setFavorites(res.data);
        }

        fetchFavorites();
    },[])


    return(
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-4">
                My Favorites
            </h1>

            {favorites.map((fav) => (
                <div key={fav.id} className="border p-4 mb-3">
                    <h2>{fav.property.title}</h2>

                    <p>{fav.property.city}</p>
                </div>
            ))}
            
        </div>
    )
}

export default Favorites;