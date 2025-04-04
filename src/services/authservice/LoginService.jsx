import { AlertHelper } from "../../components/alertas/AlertHelper";
import AxiosClient from "../../config/axiosconfig/http-config"
import axios from "axios";

export const login = async (email, password) => {
    const data = {
        username: email, 
        password: password
    }
    try {
        
        console.log(data);
        const response = await axios.post("http://127.0.0.1:8080/api/auth/login", {
            username: email,
            password: password
        });
        console.log("Respuesta del login:", response);
        const token = response.data.data.token;
        const user = response.data.data.user; 
        console.log("Token en LoginService:", token);
        console.log("Usuario:", user);
        

        localStorage.setItem("token", token);  // Guarda el token
        const mamadas = localStorage.getItem("token");
        console.log("Token guardado en localStorage:", mamadas);
        
        localStorage.setItem("user", user);
        localStorage.setItem("rol", response.data.data.role.nombre);
        localStorage.setItem("fokinCoso", response.data.data.token);
        localStorage.setItem("elfokinUser", response.data.data.user);

        if (response != null) {
            AlertHelper.showAlert("Inicio de sesión exitoso", 'success');
        }

        return {
            response
        }
    } catch (error) {
        AlertHelper.showAlert(
            error.response?.data?.detail || "Credenciales incorrectas",
            'error'
        );
        throw error;  // Propaga el error para manejo adicional
    }
}