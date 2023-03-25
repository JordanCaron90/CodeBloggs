// Initial dependencies and definitions
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");
const Express = require('express');
const app = Express();
const port = process.env.PORT || 5000;
const MongoManager = require('./shared/db/mongo-manager');

const UserRoutes = require("./features/routes/user.routes");
const PostRoutes = require("./features/routes/post.routes");
const SessionRoutes = require("./features/routes/session.routes");
const CommentRoutes = require("./features/routes/comment.routes");

app.use(cors());
app.use(Express.json());

UserRoutes.registerUserRoutes(app);
PostRoutes.registerPostRoutes(app);
SessionRoutes.registerSessionRoutes(app);
CommentRoutes.registerCommentRoutes(app);

//Mongo Connection
MongoManager.openMongoConnection();

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
});