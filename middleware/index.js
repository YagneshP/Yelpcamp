var Campground = require("../models/campground");
var Comment    = require("../models/comment");


// All middleware here

var middlewareObj ={};

// checkCommentOwnership
middlewareObj.checkCommentOwnership = function(req, res, next){
	//is user logged in
	   if(req.isAuthenticated()){
		  	Comment.findById(req.params.comment_id, function(err, foundComment){
			 if(err || !foundComment){
				 req.flash("error", "Comment not found");
				 res.redirect("back");
				 } else{
					 //is user owns comment
					 if(foundComment.author.id.equals(req.user._id)){
						next(); 
					 } else{
						 // otherwise , redirect somewhere
						 req.flash("error", "You don't have permission to that");
						 res.redirect("back");
					 }
				  
				 }
		
			 });
	 		
	   } else{
		    req.flash("error", "You need to be logged in to do that");
		    //redirect somewhere
		  res.redirect("/login");
	   }
	 	
	
}


//checkCampgroundOwnership

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	//is user logged in
	   if(req.isAuthenticated()){
		  	Campground.findById(req.params.id, function(err, foundCampground){
			 if(err || !foundCampground){
				 req.flash("error", "Campground not found");
				 res.redirect("back");
				 } else{
					 //is user owns campground
					 if(foundCampground.author.id.equals(req.user._id)){
						next(); 
					 } else{
						 req.flash("You don't have permission to do that");
						 // otherwise , redirect somewhere
						 res.redirect("back");
					 }
				  
				 }
		
			 });
	 		
	   } else{
		   req.flash("error", "You need to be logged in to do that");
    //redirect somewhere
		  res.redirect("back");
	   }
	 	
	
}

// isloggedin function
middlewareObj.isLoggedIn=function(req, res, next){
	if(req.isAuthenticated()){
	    return next();
	   }
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}


module.exports= middlewareObj;