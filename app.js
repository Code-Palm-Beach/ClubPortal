const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const promisify = require("es6-promisify");
const flash = require("connect-flash");
const routes = require("./routes/index");
const helpers = require("./helpers");
const errorHandlers = require("./handlers/errorHandlers");

// create an express app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view options", { open: "<@", close: "@>" });
app.set("view engine", "ejs");

// serves up static files form the public folder
app.use(express.static(path.join(__dirname, "public")));

// Takes the raw request and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// populates req.cookes with any cookies that came along with a request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
    // store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// The flash middle ware let's us use req.flash(),
// which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
// app.use((req, res, next) => {
//   req.login = promisify(req.login, req);
//   next();
// });

// After all that middleware above, we finally handel our own routes
app.use("/", routes);

// if that above route does not work, we 505 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get("env") === "development") {
  // Development Error Handler - Prints stack trace
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
