import React, { useContext } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom'
import AuthContext from '../config/context/auth-context'
import Login from '../modules/controlacceso/Login';
import Users from '../modules/admin/Users';

function AppRouter() {
    const { user } = useContext(AuthContext);
    const rol = localStorage.getItem('rol');
    

    const router = 
    createBrowserRouter(
        createRoutesFromElements(
            <Route>
                {/* Ruta pública */}
                <Route 
                    path="/login" 
                    element={!user?.signed ? <Login /> : <Navigate to="/" replace />} 
                />
                if (rol === 'ADMIN') {
                    <Route path="/" element={<Users />} />
                } else if (rol === 'RESPONSABLE') {

                }else if (rol === null){
                    <Route path="/" element={<Login />} />
                }
                
                {/* Ruta 404 */}
                <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Route>
        )
    );

    return <RouterProvider router={router} />
}

export default AppRouter