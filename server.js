const express = require("express");

//adding body-parser middleware , it helps the server to reads the data.
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user.routes");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

userRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is listning to PORT:", PORT);
});
