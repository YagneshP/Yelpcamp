var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");



// Index :campground page

router.get("/", function(req,res){
	//collect data from datbase
	Campground.find({}, function(err, allCampground){
		if(err){
			console.log(err)
		}else{
			res.render("campground/index",{campGround: allCampground});
		}
	});
	
})

// Create: Creating Campground page

router.post("/", middleware.isLoggedIn, function(req,res){
	//get data from form and add to array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author ={
		id: req.user._id,
		username: req.user.username
	};
	var newCampground ={name: name, image:image, description:desc, author:author, price: price};
	Campground.create(newCampground, function(err,newlyCreated){
		if (err){
			console.log(err);
		} else{
			console.log(newlyCreated);
			//redirect to campground page
			res.redirect("/campground");
		}
	});	
	
})

// NEW :form page 

router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campground/new");
})

// SHOW : Showing the description of campground

router.get("/:id", function(req,res){
	//find particula campground with unique id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
			res.redirect("back");
		} else{
			//render that campground
			res.render("campground/show",{campground:foundCampground});
		}
	})
	
});

// Edit route
 router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req,res){
	 	Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				res.redirect("/campground");
			} else{
				 res.render("campground/edit",{campground: foundCampground}); 
			}
			
		});
 });

// Update Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	//find and update correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campground");
		} else{
			//redirect to show page
			res.redirect("/campground/" + req.params.id);
		}
	});
	
});

//DESTROY ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campground");
		} else{
			res.redirect("/campground");
		}
	})
})



module.exports = router;