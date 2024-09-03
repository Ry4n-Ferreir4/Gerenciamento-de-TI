'use client';

import React, { useContext } from 'react';
import AuthContext from '@/app/context/AuthContext';
import { Container } from '@/app/components/StyledComponents';

const Profile = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <p>Carregando...</p>;
    }

    return (
        <Container>
            <h2>Perfil do Usuário</h2>
            <p>Olá {user.usuario}, você é um usuário do tipo: {user.tipo_usuario}</p>
        </Container>
    );
};

export default Profile;
