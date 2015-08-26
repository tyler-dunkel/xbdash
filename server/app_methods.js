Meteor.methods({
	/*,
    sendWelcomeEmail: function (user, from, subject, text) {
        check([from, subject, text], [String]);
        this.unblock();

        var user = Meteor.user();
        var userAchievements = userAchievement1s.find({ userId: user._id, progressState: false }, { sort: { progression: -1 }, limit: 2 });
        var userGames = userGames.find({ userId: user._id, completed: false }, { sort: { lastUnlock: -1 }, limit: 2 });

        Mandrill.messages.sendTemplate({
        	template_name: 'verify-email',
        	template_content: [
        	{
        		name: 'body',
        		content: 'Breaking news! Federal Agents Raid Gun Shop, Find Weapons'
        	}
        	],
        	message: {
        		subject:	'Verify Your Email Address',
        		from_email:	'contact@xbdash.com',
        		to: [
        		{ email: user.emails[0].address }
        		],
		        global_merge_vars: [
		        {
		        	name: 'NAME',
		        	content: user.username
		        }
		        ],
		        merge_vars: [
		        {
		        	rcpt: 'email@example.com',
		        	vars: [
		        	{
		        		name: 'fname',
		        		content: 'John'
		        	},
		        	{
		        		name: 'lname',
		        		content: 'Smith'
		        	}
		        	]
		        }
		        ]
		    }
		});
		return;
    }
    */
});