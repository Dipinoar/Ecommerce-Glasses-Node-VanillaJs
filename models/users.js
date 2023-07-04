const sequelize = require('../config/connection.js')
const {DataTypes} = require("sequelize")


const Users =sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      pass: {
        type: DataTypes.TEXT,
        allowNull: true
      },
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  


module.exports = Users;
