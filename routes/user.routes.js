const userController = require("../controllers/user.controller");

const routes = (app) => {
  //create a new User
  app.post("/user/api/v1/createUser", userController.createNewUser);

  //get All the user
  app.get("/user/api/v1/getAllUsers", userController.getAllUsers);

  //get user by Email
  app.get("/user/api/v1/getUserByEmail", userController.getUserByEmail);

  //edit user by id
  app.put("/user/api/v1/editUser/:id", userController.editUserById);
};

module.exports = routes;
