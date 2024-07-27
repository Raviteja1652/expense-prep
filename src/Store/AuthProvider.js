import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = props => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)

    const loginHandler = token => {
        setToken(token)
        localStorage.setItem('token', token)
    };

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    const contextValue = {
        token: token,
        onLogin: loginHandler,
        onLogout: logoutHandler
    }

    return (
        <div>
            <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
        </div>
    )
};

export default AuthProvider;