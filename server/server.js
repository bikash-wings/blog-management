var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const blogsRoutes = require("./routes/blogRoute");
const rolesRoutes = require("./routes/rolesRoute");
const permissionRoutes = require("./routes/permissionRoute");
const messagesRoutes = require("./routes/messagesRoute");
const db = require("./models");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("./utills/passport");

var app = express();

// view engine setup

// eslint-disable-next-line no-undef
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(
	session({
		// eslint-disable-next-line no-undef
		secret: process.env.JWT_SECRET_KEY,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/blogs", blogsRoutes);
app.use("/api/v1/roles", rolesRoutes);
app.use("/api/v1/permissions", permissionRoutes);
app.use("/api/v1/messages", messagesRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

db.sequelize.sync().then(() => {
	console.log("db synchronized");
});

module.exports = app;
