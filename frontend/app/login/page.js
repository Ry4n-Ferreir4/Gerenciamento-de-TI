'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Input, Button } from '@/components/StyledComponents';
import AuthContext from '@/context/AuthContext';
import { loginSchema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const Login = () => {
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.senha);
            router.push('/dashboard');
        } catch (error) {
            setError('Login falhou');
        }
    };

    return (
        <Container>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('email')} placeholder="Email" />
                {errors.email && <p>{errors.email.message}</p>}
                
                <Input {...register('senha')} type="password" placeholder="Senha" />
                {errors.senha && <p>{errors.senha.message}</p>}
                
                <Button type="submit">Entrar</Button>
                {error && <p>{error}</p>}
            </Form>
        </Container>
    );
};

export default Login;
