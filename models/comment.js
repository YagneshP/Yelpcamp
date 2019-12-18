var mongoose   = require('mongoose');

var commentSchema = new mongoose.Schema({
  title: String,
  author:{
	  id:{
		  type: mongoose.Schema.Types.ObjectId,
		  ref:"User"
	  },
	  username: String
  }
  
});

 // creating comment Model with Schema and export


module.exports = mongoose.model('Comment', commentSchema);