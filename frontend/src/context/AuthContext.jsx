import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(null);
    const [loading, setLoading ] = useState(true);

    const fetchUser = async ()=> {
        try {
            const res = await axiosInstance.get("/auth/me");

            setUser(res.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    },[])


    const logout = async () => {
        await axiosInstance.post("/auth/logout");

        setUser(null);
    };


    return(
        <AuthContext.Provider value={{user, setUser, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);