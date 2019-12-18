var Campground = require("./models/campground.js"),
	Comment    = require("./models/comment.js"),
    mongoose   = require('mongoose');
var data =[
	{
	name:"Sugarloaf Park",
	image:"https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel risus eu sem feugiat fringilla ut sed enim. Suspendisse sed diam vitae diam accumsan dignissim. Etiam mattis eros in mi varius lobortis. Praesent condimentum risus sit amet blandit varius. Sed pretium erat eu eros euismod vestibulum. Donec dignissim semper leo, pretium tempor nibh. Duis vitae aliquet tellus. Aenean accumsan, ex vitae tincidunt ornare, velit est laoreet lorem, ac porttitor purus neque nec odio."
	},
	{
	name:"Mountain Hike",
	image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
	description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel risus eu sem feugiat fringilla ut sed enim. Suspendisse sed diam vitae diam accumsan dignissim. Etiam mattis eros in mi varius lobortis. Praesent condimentum risus sit amet blandit varius. Sed pretium erat eu eros euismod vestibulum. Donec dignissim semper leo, pretium tempor nibh. Duis vitae aliquet tellus. Aenean accumsan, ex vitae tincidunt ornare, velit est laoreet lorem, ac porttitor purus neque nec odio."
	},
	{
	name:"Archer River Roadhouse",
	image:"https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
	description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel risus eu sem feugiat fringilla ut sed enim. Suspendisse sed diam vitae diam accumsan dignissim. Etiam mattis eros in mi varius lobortis. Praesent condimentum risus sit amet blandit varius. Sed pretium erat eu eros euismod vestibulum. Donec dignissim semper leo, pretium tempor nibh. Duis vitae aliquet tellus. Aenean accumsan, ex vitae tincidunt ornare, velit est laoreet lorem, ac porttitor purus neque nec odio."
	}
		  ];

function seedDB(){
	Campground.remove({}, function(err){
		// if(err){
		// 	console.log(err)
		// } else{
		// 	console.log("removed campground");
		// 	data.forEach(function(seed){
		// 		Campground.create(seed, function(err, campground){
		// 			if(err){
		// 				console.log(err);
		// 			} else{
		// 				console.log("added a campground");
		// 				Comment.create({
		// 					title:"This place is awesome but i wish i could have internet",
		// 					author:"Homer"
		// 				}, function(err, comment){
		// 					if(err){
		// 						console.log(err);
		// 					} else{
		// 						campground.comments.push(comment);
		// 						campground.save();
		// 						console.log("Created a new comment");
		// 					}
		// 				});
		// 			} 
		// 		})
		// 	})
		// }
	});
}






module.exports = seedDB;