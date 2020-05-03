var mongoose = require('mongoose');
var Comment = require('./models/comment');
var User = require('./models/user');


var data = [
    {
        name: "Paul Je", 
        city: "Toronto",
		email: "pjeewoo@gmail.com",
		career: "business"
    },
    {
        name: "Daniel Je", 
        city: "the6",
		email: "danielje.3@hotmail.com",
		career: "business"
    },
    {
        name: "MrAmazing", 
        city: "Amazeworld",
        email: "amazingman@gmail.com",
		career: "amazeness"
    }
]
// Creating the comments, but already done it once! Should be enough.

function seedDB(){
   //Remove all campgrounds
   User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed users!");
         //add a few campgrounds
        data.forEach(function(seed){
            User.create(seed, function(err, user){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a comment.. text!");
                    //create a comment
                    Comment.create(
                        {
                            text: "I can't believe I've come this far!"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                user.comments.push(comment);
                                user.save();
                                console.log("Created new comment for .. a user! Please work..");
                            }
                        });
                }
            });
        });
    }); 
   // add a few comments	
}

module.exports = seedDB;