'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paypal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paypal.init({
    userId: DataTypes.INTEGER,
    paypalAccount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paypal',
  });
  return Paypal;
};