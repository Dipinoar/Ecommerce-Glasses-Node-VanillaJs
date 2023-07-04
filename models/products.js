const sequelize = require('../config/connection.js')
const {DataTypes} = require("sequelize")


const productos=sequelize.define('products', {
    sku: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    descuento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    imagen: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "sku" },
        ]
      },
    ]
  });


  module.exports = productos;
