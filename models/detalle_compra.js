const {DataTypes} = require("sequelize")
const sequelize = require('../config/connection.js')


const detalleCompra= sequelize.define('detalle_compra', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    producto_sku: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'sku'
      }
    },
    cantidad_compra: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    compra_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'compra',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'detalle_compra',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "detalle_compra_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  module.exports = detalleCompra;