import React, { createContext, useContext, useState, useEffect } from "react";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [authData, setAuthData] = useState({ token: "", currentUser: {} });

    // Initialize authData from localStorage if a token is present
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setAuthData((prevAuthData) => ({
                ...prevAuthData,
                token: storedToken,
            }));
        }
    }, []);

    async function login(user) {
        try {
            const tokenResponse = await JoblyApi.loginUser(user);
            const token = tokenResponse.token;
            localStorage.setItem("token", token);
            setAuthData((prevAuthData) => ({
                ...prevAuthData,
                token,
            }));
        } catch (e) {
            console.error("Error logging in:", e);
        }
    }

    async function signOut() {
        localStorage.removeItem("token");
        setAuthData((prevAuthData) => ({
            ...prevAuthData,
            token: "",
            currentUser: {},
        }));
    }

    useEffect(() => {
        JoblyApi.token = authData.token;
        console.log("token updated!");
        if (authData.token) {
            jwt_decode(authData.token).then((decodedToken) => {
                JoblyApi.getUserInfo(decodedToken.username).then((userInfo) => {
                    setAuthData((prevAuthData) => ({
                        ...prevAuthData,
                        currentUser: userInfo,
                    }));
                });
            });
        }
    }, [authData.token]);

    useEffect(() => {
        console.log(authData.currentUser);
        authData.token ? console.log("Logged in") : console.log("Logged out!");
    }, [authData.currentUser]);

    return (
        <AuthContext.Provider value={{ authData, login, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
