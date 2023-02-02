const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    user_idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_email: {
      type: DataTypes.STRING
    },
    user_password: {
      type: DataTypes.STRING
    },
    user_name: {
      type: DataTypes.STRING
    },
    user_address: {
      type: DataTypes.STRING
    },
    user_type: {
      type: DataTypes.STRING
    },
    user_point: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName: 'User',
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
