import React, { useEffect, useReducer } from 'react';
import AppRouter from './router/AppRouter';
import AuthContext from './config/context/auth-context';
import { authManager } from './config/context/auth-manager';

const init = () => {
    const token = localStorage.getItem('token');
    

    
    let user = null;
    try {
        const userString = localStorage.getItem('user');
        user = userString && userString !== "undefined" ? JSON.parse(userString) : null;
    } catch (e) {
        console.error("Error al parsear el usuario:", e);
        user = null;
    }
    return {
        signed: !!token,
        user: token ? { token, user } : null
    };
};

function App() {
    const [user, dispatch] = useReducer(authManager, {}, init);

    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRouter />
        </AuthContext.Provider>
    );
}

export default App;