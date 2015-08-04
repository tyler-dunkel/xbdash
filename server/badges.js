// Meteor.setInterval(function() {
// 	var users = Meteor.users.find({"status.online": true});
// 	if (!users.count()) {
// 		Meteor._debug("there is no one signed up");
// 		return;
// 	}
// 	users.forEach(function(user) {
// 		Meteor._debug("user ID is: " + user._id);
// 	});

// }, 300000);