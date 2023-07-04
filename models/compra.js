const sequelize = require('../config/connection.js')
const {DataTypes} = require("sequelize")


const Compra =sequelize.define('compra', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    detallepago_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'compra',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "compra_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  


module.exports = Compra;
