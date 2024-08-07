import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loading from './Loading';

const ProtectedRoute = ({ element, roles, redirectPath }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    // Se o usuário está logado e tenta acessar a página de login, redireciona para o dashboard
    if (redirectPath === '/login' && user) {
        return <Navigate to="/dashboard" />;
    }

    // Se o usuário não está logado e tenta acessar páginas protegidas, redireciona para o login
    if (!user && redirectPath !== '/login') {
        return <Navigate to="/login" />;
    }

    // Se o usuário não tem a permissão necessária, redireciona para o dashboard
    if (roles && user && !roles.includes(user.tipo_usuario)) {
        return <Navigate to="/dashboard" />;
    }

    // Se o usuário está logado e tem a permissão necessária, renderiza o componente
    return element;
};

export default ProtectedRoute;
