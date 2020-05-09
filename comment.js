var mongoose = require('mongoose');


var commentSchema = mongoose.Schema ({

	message: String,
	createdAt: { type: Date, default: Date.now },
	userAccount: {
		id: 	{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
				},
		username: String,
	}

});

module.exports = mongoose.model("Comment", commentSchema);














// HOW I HAD IT BEFORE I NESTED BOTH VARIABLES INTO ANOTHER VARIABLE OF AN ARRAY 
// var mongoose = require('mongoose');


// var commentSchema = mongoose.Schema ({
// 	text: String,
// 	userAccount: {
// 			id: {
// 					type: mongoose.Schema.Types.ObjectId,
// 					ref: "User"
// 			},
// 			username: String
// 	}
// });

// module.exports = mongoose.model("Comment", commentSchema);