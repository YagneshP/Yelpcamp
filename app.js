var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	flash      = require("connect-flash"),
	Campground = require("./models/campground.js"),
	Comment    = require("./models/comment.js"),
	User       = require("./models/user.js"),
	passport   = require ("passport"),
	LocalStrategy = require("passport-local"),
    mongoose   = require('mongoose'),
	seedDB     = require("./seed.js");

var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes    = require("./routes/comments"),
	indexRoutes      = require("./routes/index");


// connecting mongoose with database
var url=process.env.DATABASEURL || 'mongodb://localhost/yelp_camp';
mongoose.connect( url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
		console.log("connected to DB");
}).catch(err =>{
	console.log("Error:", err.message);
});


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/Public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); //seed the database
//===============
//PASSPORT CONFIG
//===============
app.use(require("express-session")({
	secret: "123456789",
	resave: false,
	saveUninitialized: false
}));

passport.use(new LocalStrategy( User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error       = req.flash("error");
	res.locals.success     = req.flash("success");
	next();
});

//=======
//ROUTES
//========

app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comment",commentRoutes);
app.use("/", indexRoutes );












//Listening on the PORT 3000

app.listen(process.env.PORT, function(){
	console.log("YelpCamp Server has started");
})