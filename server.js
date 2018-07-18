const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

const routes = require("./routes");
var db = require("./models");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

// Syncing our database and logging a message to the user upon success..sync({alter:true})
db.sequelize.sync()
  .then(function () {
    // Start the API server
    app.listen(PORT, function () {
      console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
  });
