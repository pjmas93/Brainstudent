// Require & Import Variables

var express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	bodyParser = require('body-parser'),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds")


// connect mongoose database
	
mongoose.connect('mongodb://localhost/bs', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
seedDB();




//home page

app.get("/", function(req, res){
    res.render("index");
});




//chatbox
// show all comments initially before creating then showing users and their comments

// app.get("/chatbox", function(req, res) {
// 	// get users
	
// 	User.find({}, function(err, user) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log(user);
// 			res.render("chatbox", {user: user});
// 		}
// 	});
// });



// create a new comment from user
app.post("/campgrounds", function(req, res){
    // get data from form and add to user array
    var name = req.body.name;
    var city = req.body.city;
    var email = req.body.email;
    var career = req.body.career;
	var comments = req.body.comments;
	var user = {
		id: req.user._id,
		// username: req.user.username,
		
	};
	
	var newUser = {id: id, name: name, city: city, email: email, career: career};
	
    // Create a new user and save to DB
    User.create(newUser, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/chatbox");
        }
    });
});



// v1 of populate command to show all comments
app.get("/chatbox", function(req, res){
	User.find({}).populate("comments").exec(function(err, allUsers) {
	if (err) {
		console.log(err);
	} else {
		res.render("chatbox", {user: allUsers});
	}
	});
})










// Server connection to port 


app.listen(3000, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});