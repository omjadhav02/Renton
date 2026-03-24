import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})


axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
        if( error.response?.status === 401){
            console.error("Unauthorized")
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;