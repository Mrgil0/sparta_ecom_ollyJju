const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    productInfo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    productImage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Products',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
