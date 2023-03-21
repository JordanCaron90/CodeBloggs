// Initial dependencies and definitions
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");
const Express = require('express');
const app = Express();
const port = process.env.PORT || 5000;
const MongoManager = require('./src/shared/db/mongodb/mongo-manager.js');

app.use(cors());
app.use(Express.json());

// get driver connection
const dbo = require("./db/conn");

//Mongo Connection
MongoManager.openMongoConnection();

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
});