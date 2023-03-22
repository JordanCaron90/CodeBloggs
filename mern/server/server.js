// Initial dependencies and definitions
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");
const Express = require('express');
const app = Express();
const port = process.env.PORT || 5000;
const MongoManager = require('./shared/db/mongo-manager');

const UserRoutes = require("./features/routes/user.routes");

app.use(cors());
app.use(Express.json());

UserRoutes.registerUserRoutes(app);

//Mongo Connection
MongoManager.openMongoConnection();

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
});