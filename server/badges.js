Meteor.setInterval(function() {
	var users = Meteor.users.find({"status.online": true});
	if (!users.count()) {
		Meteor._debug("there is no one signed up");
		return;
	}
	users.forEach(function(user) {

		// anniversaryB - anniversary badge - annual;
		// gamerscoreB - gamerscore badge - every 5k to 100k (10, 15, 20, 25), then anything after is by 25k continued (125, 150, 175);
		// completedGamesB - completed games badge (number changes);
		// completedAchievementsB - completed achievements count badge (number is in format 5k, 10k, etc);
		// achievementsCompletionB - achievement % badge;
		// gamesCompletionB - games % badge;
		// future: # of friends badge: every 10 friends;
		// future: featured badge - if highlighted on the monthly player feature article;
		// future: beta badge - was a beta tester;
		// future: first 1000 badge - was one of the first 1000 members of XBdash;

		Meteor._debug("user ID is: " + user._id);

		//var progressState = (achievement.unlocked !== false) ? true : false;
		
		var anniversaryB;
		var gamerscoreB;
		var completedAchievementsB;
		var completedGamesB;
		var achievementsCompletionB;
		var gamesCompletionB;

		var badgeSet = {
			//gameId: gameId,
			//name: achievement.name,
		};

		badges.upsert({ _id: user._id }, { $set: badgeSet });
	});
}, 3000000);