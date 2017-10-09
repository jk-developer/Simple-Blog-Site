var express = require('express');
var app = express();
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var User = require('./models/user');
var Blog = require('./models/blogs');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var ejs = require("ejs");
var flash = require('connect-flash');


/// confiure Routes
var homeRoutes = require('./routes/homeRoutes');
var blogRoutes = require('./routes/homeRoutes');



mongoose.connect("mongodb://localhost/registration");
app.use(require("express-session")({
  secret: "This is the registration site",
  resave: false,
  saveUninitialized: false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

// App config

app.use(express.static("public"));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Allow app to use routes
app.use(homeRoutes);
app.use(blogRoutes);


app.listen(1000, () => {
  console.log('Server is started on port 1000...');
});
