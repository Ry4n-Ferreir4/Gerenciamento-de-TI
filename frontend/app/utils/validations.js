import { z } from 'zod';

// Validação para login
export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

// Validação para registro
export const registerSchema = z.object({
    usuario: z.string().min(1, 'Usuário é obrigatório'),
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    tipo_usuario: z.enum(['User', 'Admin', 'Gestor'], 'Tipo de usuário inválido'),
});

// Validação para movimentações
export const movimentacaoSchema = z.object({
    data_solicitacao: z.string().nonempty('Data da solicitação é obrigatória'),
    item: z.string().nonempty('Item é obrigatório'),
    tipo: z.enum(['Entrada', 'Saída'], 'Tipo de movimentação inválido'),
});

// Validação para serviços
export const servicoSchema = z.object({
    nome: z.string().nonempty('Nome do serviço é obrigatório'),
    descricao: z.string().nonempty('Descrição é obrigatória'),
});

// Validação para itens
export const itemSchema = z.object({
    nome: z.string().nonempty('Nome do item é obrigatório'),
    quantidade: z.number().nonnegative('Quantidade deve ser um número positivo'),
});
