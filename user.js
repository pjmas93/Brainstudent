var mongoose = require('mongoose'),
	passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema ({
	
	name: String,
	city: String,
	email: String,
	career: String,
	username: String,
	password: String,
		createdAt: { type: Date, default: Date.now },

	comments:
	[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"

		}
	]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
