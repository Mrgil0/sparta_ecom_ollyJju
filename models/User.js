'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    user_idx: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_name: DataTypes.STRING,
    user_address: DataTypes.STRING,
    user_type: DataTypes.STRING,
    user_point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};