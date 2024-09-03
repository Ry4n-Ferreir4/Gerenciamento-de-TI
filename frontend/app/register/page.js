'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Input, Button, Select } from '@/components/StyledComponents';
import AuthContext from '@/context/AuthContext';
import { registerSchema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers.zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '@/config/config';

const Register = () => {
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            await axios.post(`${config.API_BASE_URL}/register`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            router.push('/dashboard');
        } catch (error) {
            setError('Falha ao registrar usuário');
        }
    };

    if (user.tipo_usuario !== 'Admin' && user.tipo_usuario !== 'Gestor') {
        return <p>Acesso negado</p>;
    }

    return (
        <Container>
            <h2>Registrar Usuário</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('usuario')} placeholder="Usuário" />
                {errors.usuario && <p>{errors.usuario.message}</p>}
                
                <Input {...register('email')} placeholder="Email" />
                {errors.email && <p>{errors.email.message}</p>}
                
                <Input {...register('senha')} type="password" placeholder="Senha" />
                {errors.senha && <p>{errors.senha.message}</p>}
                
                <Select {...register('tipo_usuario')}>
                    <option value="User">Usuário</option>
                    <option value="Admin">Admin</option>
                    <option value="Gestor">Gestor</option>
                </Select>
                {errors.tipo_usuario && <p>{errors.tipo_usuario.message}</p>}
                
                <Button type="submit">Registrar</Button>
                {error && <p>{error}</p>}
            </Form>
        </Container>
    );
};

export default Register;
