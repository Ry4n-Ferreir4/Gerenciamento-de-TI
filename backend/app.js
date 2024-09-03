const express = require('express');
const cors = require('cors');
const sequelize = require('./config/config');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log('Servidor rodando na porta 5000');
    });
}).catch(error => console.log('Erro ao sincronizar com o banco de dados:', error));
