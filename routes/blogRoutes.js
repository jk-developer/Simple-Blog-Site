var express = require('express');
var router = express.Router();
var Blog = require('../models/blogs');

// RESTFUL Blog ROUTES

// show page  /blogs get route
router.get('/blogs', (req, res) =>{
  // find all the blogs from the DB store in blogs array
  Blog.find({}, function(err, blogs){
    if(err){
      console.log(err);
    }
    else {
      // and pass this obtained array from the DB and pass to the index template
      res.render('index', {blogs: blogs});
    }
  });
});

// form page and /blogs/new route
router.get('/blogs/new', function(req, res){
  res.render('new');
});

// blogs post route where the form will be submitted
router.post("/blogs",(req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  // here all the form data will be available in the req.body.blog
  // we save this form data to the DB
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      res.render("new");
    }else {
      res.redirect('/blogs');
    }
  });
});

router.get('/blogs/:id', function(req, res){
  // finding the blog with the particular id from the DB
  // store that blog data into variable foundBlog
   Blog.findById(req.params.id, function(err, foundBlog){
     if(err)
     {
       res.redirect('/blogs');
     }
     else {
       // rendering the show page by passing the foundBlog data obtained from the DB
       res.render('show', {blog: foundBlog});
     }
   });
});

router.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, foundId){
    if(err)
    {
      res.redirect('/blogs');
    }
    else {
      res.render("edit", {abc: foundId});
    }
  });
});

// update route
router.put('/blogs/:id', function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // finding that id from the user's choice and then updating using findByIdAndUpdate function
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err)
    {
      res.redirect('/blogs');
    }
    else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

router.delete('/blogs/:id', function(req, res){
  // destroy blogs
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect('/blogs');
    }
    else {
      {
        res.redirect('/blogs');
      }
    }
  });
});

module.exports = router;
