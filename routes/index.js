var express    = require("express");
var router     = express.Router();
var passport   = require ("passport");
var User       = require("../models/user");

// Home Page

router.get("/", function(req,res){
	res.render("landing");
})



//===========
//AUTH ROUTES
//===========

//show register form

router.get("/register", function(req,res){
	res.render("register");
});

// Post register

router.post("/register", function(req,res){
	User.register(new User({username: req.body.username}), req.body.password , function(err, user){
		if(err){
			req.flash("error", err.message);
	//object before returning a res.redirect() or you can pass the req.flash object into the res.render() function.
			 // return res.render("register", {"error": err.message});
    
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Yelpcome " + user.username);
			res.redirect("/campground");
		});
	})
});

// Show Login Form 
router.get("/login", function(req,res){
	res.render("login");
});

//Handling Login Logic 
router.post("/login", passport.authenticate("local", {
	successRedirect:"/campground",
	failureRedirect:"/login"
}),function(req, res){
	res.send("Login logic happen here");
});

// Logout logic
router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "You are logged out");
	res.redirect("/campground");
});

module.exports= router;
