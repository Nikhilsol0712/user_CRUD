const userServices = require("../services/user.service");

const createNewUser = async (req, res) => {
  const response = await userServices.createNewUser(req.body);
  if (!response) {
    return res.json({
      message: "Invalid Inputs! Please Re-enter",
      success: true,
      code: 400,
    });
  }
  return res.json({
    message: "Successfully created the user",
    success: true,
    code: 201,
    data: response,
  });
};

const getAllUsers = async (req, res) => {
  const response = await userServices.getAllUsers();
  return res.json({
    message: "successfully Fetched the users",
    sucess: true,
    code: 200,
    data: response,
  });
};

const getUserByEmail = async (req, res) => {
  const response = await userServices.getUserByEmail(req.body.email);
  if (!response) {
    return res.json({
      message: "User not found with Entered Email",
      success: true,
      code: 400,
      data: response,
    });
  }
  return res.json({
    message: "Successfully Fetch the user",
    success: true,
    code: 201,
    data: response,
  });
};

const editUserById = async (req, res) => {
  const response = userServices.editUserById(req.params.id, req.body);
  return res.json({
    message: "Successfully update the User Data",
    success: true,
    code: 201,
    data: response,
  });
};

module.exports = { createNewUser, getAllUsers, getUserByEmail, editUserById };
