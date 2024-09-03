const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './instance/database.sqlite',
    logging: false,
});

module.exports = sequelize;
