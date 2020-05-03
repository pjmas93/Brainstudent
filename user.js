var mongoose = require('mongoose');


var userSchema = new mongoose.Schema ({
	
	name: String,
	city: String,
	email: String,
	career: String,
	comments:
	[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"

		}
	]
});

module.exports = mongoose.model("User", userSchema);
