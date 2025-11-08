import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { mockDatabase } from '../utils/mockData';
import axios from 'axios';

const AUTH_KEY = 'scfmp_user_auth';
const API_BASE_URL = 'http://localhost:5000'; // Define API URL here

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // --- Initial Load from Local Storage ---
    useEffect(() => {
        const storedAuth = localStorage.getItem(AUTH_KEY);
        if (storedAuth) {
            try {
                const storedUser = JSON.parse(storedAuth);
                // Check if token exists before setting state
                if (storedUser.token) {
                    setUser(storedUser);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem(AUTH_KEY);
                }
            } catch (e) {
                console.error("Error parsing stored auth data:", e);
                localStorage.removeItem(AUTH_KEY);
            }
        }
        setIsAuthReady(true);
    }, []);

    // --- Login Function (API Call) ---
    const login = async (identifier, password, role) => {
        try {
            const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                identifier,
                password,
                role,
            });

            // The API response contains user details + the JWT token
            const userData = {
                id: data.id,
                name: data.name,
                role: data.role,
                token: data.token, // <-- CRITICALLY, save the token
            };

            setUser(userData);
            setIsAuthenticated(true);
            // Save the user object INCLUDING THE TOKEN to Local Storage
            localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
            return true;

        } catch (error) {
            console.error('Login API Error:', error.response?.data?.message || error.message);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH_KEY);
    };

    // --- Public Utility for Authenticated Data Fetch ---
    const fetchData = async (url, method = 'GET', body = null) => {
        if (!user || !user.token) {
            throw new Error("Authentication token not available.");
        }

        const config = {
            method,
            url: `${API_BASE_URL}${url}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            data: body,
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.error(`API Fetch Error (${url}):`, error.response?.data?.message || error.message);
            // If token is invalid, log out the user
            if (error.response?.status === 401) {
                logout();
            }
            throw error;
        }
    };

    const contextValue = useMemo(() => ({
        user,
        isAuthenticated,
        login,
        logout,
        isAuthReady,
        fetchData, // <-- Expose the authenticated fetcher
        mockData: mockDatabase
    }), [user, isAuthenticated, isAuthReady]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
