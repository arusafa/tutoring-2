import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    function logout() {

        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoading(false);
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}