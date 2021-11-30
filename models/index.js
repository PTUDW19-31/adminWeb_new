const Sequelize = require('sequelize');

const initModels = require("./init-models");
console.log("Name",process.env.DB_NAME);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    dialect: 'mysql',
    dialectOptions: {
        socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
    },
});

module.exports = {
    sequelize,
    models: initModels(sequelize),
};