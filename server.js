const express = require("express");
const { sequelize } = require("./models/index");
//adding body-parser middleware , it helps the server to reads the data.
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => res.send("<h1>hellow<h1>"));
userRoutes(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  await sequelize.sync();
  console.log("server is listning to PORT:", PORT);
});
