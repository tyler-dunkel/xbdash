Meteor.publishComposite('xbdContestsPub', function() {
	return {
		find: function() {
			return xbdContests.find({ 'status': 'active' });
		},
		children: [
			{
				find: function(contest) {
					var user = Meteor.users.findOne({ _id: this.userId });
					if (user) {
						return userContestEntries.findOne({ status: 'active', contestToken: contest.contestToken, userId: this.userId });
					}
				},
				find: function(contest) {
					return userContestEntries.find({ status: 'active', contestToken: contest.contestToken }, { sort: { 'data.value': -1 }, limit: 10 });
				},
				children: [
					{
						find: function(entry, contest) {
							return Meteor.users.find({ _id: entry.userId }, {
								fields: {
									"gamercard.gamertag": 1,
									"gamercard.gamerscore": 1,
									"gamercard.gamerpicLargeSslImagePath": 1,
									"gamertagSlug": 1
								}
							});
						}
					}
				]
			}
		]
	}
});