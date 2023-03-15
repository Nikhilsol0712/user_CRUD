const { User } = require("../models/index");

const createNewUser = async (data) => {
  try {
    const response = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async () => {
  const response = await User.findAll();
  return response;
};

const getUserByEmail = (data) => {
  const response = User.findOne({
    where: {
      email: data,
    },
  });
  return response;
};

const editUserById = (id, data) => {
  const response = User.update(
    {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      phoneNumber: data.phoneNumber,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return response;
};

module.exports = { createNewUser, getAllUsers, getUserByEmail, editUserById };
