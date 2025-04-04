import axios from "axios";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;


// Creamos una instancia de axios
const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

// Interceptor para agregar el token dinámicamente
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtenemos el token en cada petición
    const token = localStorage.getItem("fokinCoso");
    console.log("Token usado en request:", token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
