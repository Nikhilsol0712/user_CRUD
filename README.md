Here I created the whole project on Node.js

I followed below steps to Built this project.

1. first setup node.js project to rum the command "npm init"
2. next install express framework "npm install express".
3. Now, setup local server in server.js file
    const express = require("express");
    const app = express();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, async () => {
    await sequelize.sync();
    console.log("server is listning to PORT:", PORT);
    });
    
   
    
4. Then we need to install node.js ORM (object relational mapper), that helps us to handle the mySQL database easily. running below commands.
    "npm install sequelize sequelize-cli mysql2"
    "npm sequelize-cli init"  

6. Then add database name and password in config.js file or .env file and 
7. To create database run this command "npx sequelize-cli db:create"

8. Now we need to create one Model/table for this task so I created "User" model and migrations by running below command
   "npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,dateOfBirth:date,email:string,phoneNumber:integer"
   
9. Now add uniqueness and email Validations in models/User.js file 
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
    
10. Now run the command "npx sequelize-cli db:migrate". this command create the User model in mySQL database
=========================================================================================
Also install body-parser middleware to read the urlencoded data.
   " npm install body-parser "
========================================================================================   
   
API Building for create-get-update user.
so I used MVC architecture to create REST api,

1. create three different folders and files 1) services/userService.js 2)controller/userController.js 3)routes/userRoutes.js
    
    Now In services file I written the main Bussiness logics of api 
    and In controllers file I Handled the success messages and errors.
    and In riutes file I created the routes for each different api.
2. Below are the bussiness logic for all the API's
  
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
===============================================================================
3. Below are handled all the request and response for API's
       
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
====================================================================================

and here are all the routes for API.

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
===================================================================================
After creating the routes we need to call the routes in server.js file
     
     const express = require("express");
const { sequelize } = require("./models/index");
//adding body-parser middleware , it helps the server to reads the data.
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => res.send("<h1>hellow<h1>"));
userRoutes(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log("server is listning to PORT:", PORT);
});
==================================================================================


 
    
  
