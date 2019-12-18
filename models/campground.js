var mongoose   = require('mongoose');
// var Comment    = require("./models/comment.js");

var campgroundSchema = new mongoose.Schema({
  name: String,
  price:String,
  image:String,
  description: String,
	author : {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: String
	},
  comments:[
		 {
			 type: mongoose.Schema.Types.ObjectId,
			 ref: "Comment"
		 }
	 ]
});

 // creating campground Model with Schema


module.exports = mongoose.model('Campground', campgroundSchema);