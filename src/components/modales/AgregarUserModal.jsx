import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import AxiosClient from "../../config/axiosconfig/http-config";
import { AlertContainer, AlertHelper } from "../alertas/AlertHelper";

function AgregarUserModal({ visible, setVisible }) {
    // Estados del formulario
    const [id, setId] = useState(null);
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState([]);
    const [errors, setErrors] = useState({});

    // Función para validar y enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const nuevoUsuario = {
            email: email,
            nombre: nombre,
            apellidos: apellidos,
            username: username,
            password: password,
            rol: {
                id: rol,
                nombre: null, // O puedes quitar esto si el backend no lo necesita
            },
        };
        
        try {
            console.log(nuevoUsuario);
            
            const resposne = await AxiosClient({
                method: "POST",
                url: "api/user/save/",
                headers: {
                    "Content-Type": "application/json",
                },
                data: nuevoUsuario
            })
           AlertHelper.showAlert(
                "Usuario agregada correctamente",
                "success"
            );
            
        } catch (error) {
            AlertHelper.showAlert(
                error.message,
                "error"
            );
        } finally {
            // Limpiar los campos del formulario
            setId(null);
            setEmail("");
            setNombre("");
            setApellidos("");
            setUsername("");
            setPassword("");
            setRol([]);

            setErrors({});
            setVisible(false);
        }
    };

    return (
        <Dialog
            header="Agregar Cuenta"
            visible={visible}
            modal
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
        >
            <div className="mt-3">
                <form onSubmit={handleSubmit} className="p-fluid">
                    {/* Banco */}
                    <div className="field">
                        <FloatLabel>
                            <InputText
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className={`w-full ${errors.nombre ? "p-invalid" : ""}`}
                            />
                            <label htmlFor="nombre">Nombre</label>
                        </FloatLabel>
                        {errors.nombre && <small className="p-error">{errors.nombre}</small>}

                    </div>
                    <div className="field">
                        <FloatLabel>
                            <InputText
                                id="apellidos"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                                className={`w-full ${errors.apellidos ? "p-invalid" : ""}`}
                            />
                            <label htmlFor="apellidos">Apellidos</label>
                        </FloatLabel>
                        {errors.apellidos && <small className="p-error">{errors.apellidos}</small>}
                    </div>

                    {/* Correo */}
                    <div className="fields">
                        <div className="field">
                            <FloatLabel>
                                <InputText
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full ${errors.email ? "p-invalid" : ""}`}
                                />
                                <label htmlFor="email">Correo</label>
                            </FloatLabel>
                            {errors.email && <small className="p-error">{errors.email}</small>}
                        </div>

                        {/* Usuario */}
                        <div className="field">
                            <FloatLabel>
                                <InputText
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={`w-full ${errors.username ? "p-invalid" : ""}`}
                                />
                                <label htmlFor="username">Usuario</label>
                            </FloatLabel>
                            {errors.username && <small className="p-error">{errors.username}</small>}
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div className="field">
                        <FloatLabel>
                            <InputText
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full ${errors.password ? "p-invalid" : ""}`}
                            />
                            <label htmlFor="password">Contraseña</label>
                        </FloatLabel>
                        {errors.password && <small className="p-error">{errors.password}</small>}
                    </div>

                    {/* Rol */}
                    <div className="field">
                        <FloatLabel>
                            <Dropdown
                                id="rol"
                                value={rol}
                                options={[
                                    { label: "Administrador", value: 1 },
                                    { label: "Responsable de almacen", value: 2 },
                                ]}
                                onChange={(e) => setRol(e.value)}
                                placeholder="Seleccionar rol"
                                className={`w-full ${errors.rol ? "p-invalid" : ""}`}
                            />
                            <label htmlFor="rol">Rol</label>
                        </FloatLabel>
                        {errors.rol && <small className="p-error">{errors.rol}</small>}
                    </div>


                    {/* Botones */}
                    <div className="flex justify-content-end mt-4">
                        <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                        <Button label="Guardar" icon="pi pi-check" type="submit" className="p-button-primary ml-2" />
                    </div>
                </form>
            </div>

        </Dialog>
    );
}

export default AgregarUserModal