"use client";
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import Loading from './Loading';

const ProtectedRoute = ({ children, roles }) => {
    const router = useRouter();
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (roles && !roles.includes(user.tipo_usuario)) {
                router.push('/dashboard');
            }
        }
    }, [user, loading]);

    if (loading || !user) {
        return <Loading />;
    }

    return children;
};

export default ProtectedRoute;
