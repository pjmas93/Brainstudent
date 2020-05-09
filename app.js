// Require & Import Variables

var express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	bodyParser = require('body-parser'),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds"),
	passport = require("passport"),
	LocalStrategy = require("passport-local")

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
	


// connect mongoose database
	
mongoose.connect('mongodb://localhost/bs', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
// seedDB();
// for seeding the database

// app.set('views', './BrainStudentV2/views');
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


//home page has a problem with the req.user function to display if user is signed in..

app.get("/", function(req, res){
    res.render("index", {currentUser: req.user }); 
});


app.use(require("express-session") ({
		secret: "hope this works!",
		resave: false,
		saveUninitialized: false
		
		}));


app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/test", function(req, res) {
// 	res.render("test");
// })


// AUTHENTICATION ROUTES!

app.get("/register", function(req, res) {
	res.render("register" , {currentUser: req.user }); 
})

app.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			res.render("register");
		}  else {
		// Here i have no idea if itll work
		     User.create({user: req.body.user}, function(err, userInfoAdd){
			
			// here ^^ you may want to bring it back to req.body.message instead of message
			
           if(err){
               console.log(err);
           } else {
			   // associate user with user?!
			   userInfoAdd.name = user.name;
			   userInfoAdd.email = user.email;
			   userInfoAdd.city = user.city;
			   userInfoAdd.career = user.career;


			   //save user
			   userInfoAdd.save();
			   user.save();
		   		}
			 })
		passport.authenticate("local")(req, res, function() {
		res.redirect("/chatbox");
		});
	};
	})
});



/// Show login form!

app.get("/login", function (req, res) {
	res.render("login", {currentUser: req.user }); 
})

// handling the actual login with logic based on passport registration of respective user

app.post("/login", passport.authenticate("local", 
		{
			successRedirect: "/chatbox", 
			failureRedirect: "/login"
		}),
		 function(req, res) {

});


/// logout functionality

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
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


// =======================

// COMMENT ROUTESS

//=======================





// //worth a shot
// User.find({}).populate("comments").exec(function(err, user) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// })

// create a new comment from user


app.post("/chatbox", function(req, res){
   //lookup user using ID
   User.findById(req.user, function(err, user){
	   // GOTTA DO FIND BY ID. AND. REQ.USER. DONT FORGET THIS.
       if(err){
           console.log(err);
           res.redirect("/chatbox");
       } else {
        Comment.create({message: req.body.message}, function(err, comment){
			
			// here ^^ you may want to bring it back to req.body.message instead of message
			
           if(err){
               console.log(err);
           } else {
			   // associate user with comment
			   comment.userAccount.id = req.user._id;
			   comment.userAccount.username = req.user.username;
			   //save comment
			   comment.save();
			   
               user.comments.push(comment);
               user.save();
			   
			   console.log(comment);
               res.redirect('/chatbox');
           }
        });
       }
   });
});
	
	

// v1 of populate command to show all comments
app.get("/chatbox", function(req, res){
	User.find({}).populate("comments").exec(function(err, allUsers) {
			// THIS ACTUALLY WORKS: User.find(req.user).populate("comments").exec(function(err, allUsers) {
		/// actually just find //with the brackets sswirley
		// req.user._id works with user.find!
	if (err) {
		console.log(err);
	} else {
		
				res.render("chatbox", {user: allUsers, currentUser: req.user});
			}
		})
		
		
	});
	

  // MAY 6 THIS WORKS THIS COMBO FOR MAKING USER.COMMENTS WORK ON CHATBOX EJS 
	// post User.find(req.user,
  	// get User.find({})





	// Creating comment above using Colt's code 
	
	
// app.post("/chatbox", function(req, res){
//     // get data from form and add to user array
//     var name = req.body.name;
//     var city = req.body.city;
//     var email = req.body.email;
//     var career = req.body.career;
// 	var comments = req.body.comments;
// 	var userAccount = {
// 		id: req.user._id,
// 		// username: req.user.username,
		
// 	};
	
// 	var newUser = {id: userAccount.id, name: name, city: city, email: email, career: career};
	
//     // Create a new user and save to DB
//     User.create(newUser, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to chatbox page
//             res.redirect("/chatbox");
//         }
//     });
// });



								


// What i have that worked! but loops through unlimited so gotta fix it above just here for reference tho
// app.get("/chatbox", function(req, res){
// 	User.find({}).populate("comments").exec(function(err, allUsers) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		Comment.find({}, function(err, allComments) {
// 			if(err) {
// 				console.log(err);
// 			} else {
// 				res.render("chatbox", {user: allUsers}, {comments: allComments});
// 			}
// 		});
// 	}
// 	});
// });
			



function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}


// Server connection to port 


app.listen(3000, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});