const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hogyuns', {
    user_idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_point: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Hogyuns',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_idx" },
        ]
      },
    ]
  });
};
