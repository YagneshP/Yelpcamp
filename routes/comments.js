var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// =================
// COMMENT ROUETES
// =================
router.get("/new",middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.render("comment/new", {campground: campground});
		}
	})
});

router.post("/", middleware.isLoggedIn, function(req,res){
	
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			Comment.create(req.body.comment, function(err, newComment){
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err);
				} else{
					//add username and id to comment
					newComment.author.id =req.user._id;
					newComment.author.username = req.user.username;
					//save comment
					newComment.save();
					//pushing newcomment to the array
					foundCampground.comments.push(newComment);
					foundCampground.save();
					console.log(newComment);
					req.flash("success","Successfully added comment")
					res.redirect("/campground/"+ foundCampground._id);
				}
				
			})
		}
	})
});

//Edit Route

router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error","Campground not found");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err || !foundComment){
					req.flash("error","Comment not found");
					res.redirect("back");
				} else{
					res.render("comment/edit", {campground_id:req.params.id, comment: foundComment});
				}
			});
	});
});

//Update Route

router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else{
			res.redirect("/campground/"+req.params.id);
		}
	});
});

//Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else{
			req.flash("success", "Comment deleted");
			res.redirect("/campground/"+req.params.id);
		}
	});
});



module.exports = router;