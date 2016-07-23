Meteor.publishComposite('xbdContestsPub', function() {
	return {
		find: function() {
			return xbdContests.find({'status': 'active'});
		},
		children: [
			{
				find: function(contest) {
					var user = Meteor.users.findOne({_id: this.userId});
					if (user) {
						return userContestEntries.findOne({status: 'active', contestToken: contest.contestToken, userId: this.userId});
					}
				}
			}
		]
	}
});

