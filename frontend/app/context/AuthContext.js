"use client";
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get(`${config.API_BASE_URL}/user`)
                .then(response => {
                    setUser(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, senha) => {
        try {
            const response = await axios.post(`${config.API_BASE_URL}/login`, { email, senha });
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            const userResponse = await axios.get(`${config.API_BASE_URL}/user`);
            setUser(userResponse.data);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw new Error('Falha na autenticação');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = '';
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
