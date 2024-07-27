import React from "react";

const AuthContext = React.createContext({
    token: '',
    onLogin: () => {},
    onLogout: () => {}
});

export default AuthContext;