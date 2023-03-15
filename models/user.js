"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      email: {
        type: DataTypes.STRING,
        unique: true, //email should be unique
        validate: {
          isEmail: true, //to validate the email format is correct
        },
      },
      phoneNumber: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
