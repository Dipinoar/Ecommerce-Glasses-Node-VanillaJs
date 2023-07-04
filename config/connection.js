const { Sequelize } = require('sequelize');
/*
const sequelize = new Sequelize('ecommerce5', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres'

});
*/
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}&ssl=true`;

const sequelize = new Sequelize(URL) 


module.exports = sequelize;
