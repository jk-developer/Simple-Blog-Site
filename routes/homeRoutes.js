var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Blog = require('../models/blogs');


// // show page  /blogs get route
// router.get('/blogs', (req, res) =>{
//   // find all the blogs from the DB store in blogs array
//   Blog.find({}, function(err, blogs){
//     if(err){
//       console.log(err);
//     }
//     else {
//       // and pass this obtained array from the DB and pass to the index template
//       res.render('index', {blogs: blogs});
//     }
//   });
// });

/// GET home route
router.get('/', function(req, res){
  res.render('home');
});


/// GET route for login
router.get('/login', function(req, res){
  res.render("login");
});

// POST route for login
router.post('/blogs/login',passport.authenticate("local", {

  successRedirect: "/blogs/new",
  failureRedirectL: "/login"
}), function(req, res){

});

/// GET route for the signup route
router.get('/signup', (req, res) =>{
  res.render('signup');
});

/// POST route for the signup route

router.post('/signup', function(req, res){
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  User.register(new User({username: username, email: email}), password, function(err, user){
    if(err)
    {  console.log(err);
      res.redirect('/signup');
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect('/blogs');
      });
  });

});

// GET route for logout

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect('/');
}

module.exports = router;
