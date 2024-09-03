const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/usuario');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', authMiddleware, async (req, res) => {
    const currentUser = req.user;
    if (currentUser.tipo_usuario !== 'Admin' && currentUser.tipo_usuario !== 'Gestor') {
        return res.status(403).json({ message: 'Acesso negado' });
    }

    const { usuario, email, senha, tipo_usuario } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    try {
        const newUser = await Usuario.create({
            id: require('uuid').v4(),
            usuario,
            email,
            senha: hashedPassword,
            tipo_usuario
        });
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const user = await Usuario.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const accessToken = jwt.sign(
        { usuario: user.usuario, tipo_usuario: user.tipo_usuario },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
    res.status(200).json({ accessToken });
});

router.get('/user', authMiddleware, (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;
