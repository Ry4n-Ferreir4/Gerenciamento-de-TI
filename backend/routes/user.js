const express = require('express');
const { Usuario } = require('../models/usuario');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/users', authMiddleware, async (req, res) => {
    const currentUser = req.user;
    if (currentUser.tipo_usuario !== 'Admin') {
        return res.status(403).json({ message: 'Somente administradores podem acessar esta rota' });
    }

    const users = await Usuario.findAll();
    res.status(200).json(users);
});

router.put('/users/:id', authMiddleware, async (req, res) => {
    const currentUser = req.user;
    if (currentUser.tipo_usuario !== 'Admin') {
        return res.status(403).json({ message: 'Somente administradores podem acessar esta rota' });
    }

    const { id } = req.params;
    const { usuario, email, tipo_usuario } = req.body;

    const user = await Usuario.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.update({ usuario, email, tipo_usuario });
    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
});

router.delete('/users/:id', authMiddleware, async (req, res) => {
    const currentUser = req.user;
    if (currentUser.tipo_usuario !== 'Admin') {
        return res.status(403).json({ message: 'Somente administradores podem acessar esta rota' });
    }

    const { id } = req.params;
    const user = await Usuario.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
});

router.get('/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Bem-vindo ao Dashboard' });
});

router.get('/gestor', authMiddleware, (req, res) => {
    const currentUser = req.user;
    if (!['Admin', 'Gestor'].includes(currentUser.tipo_usuario)) {
        return res.status(403).json({ message: 'Acesso negado' });
    }
    res.status(200).json({ message: 'Bem-vindo ao painel do Gestor' });
});

router.get('/admin', authMiddleware, (req, res) => {
    const currentUser = req.user;
    if (currentUser.tipo_usuario !== 'Admin') {
        return res.status(403).json({ message: 'Acesso negado' });
    }
    res.status(200).json({ message: 'Bem-vindo ao painel do Admin' });
});

module.exports = router;
