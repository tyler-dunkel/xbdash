Meteor.methods({
    sendWelcomeEmail: function () {
    	this.unblock();

		var user = Meteor.user();
        var userAchievementsCount = userAchievements.find({ userId: user._id, progressState: true }).count();
        var userTotalAchievements = userAchievements.find({ userId: user._id }).count();
        var userGamesCount = userGames.find({ userId: user._id, completed: true }).count();
        var userTotalGames = userGames.find({ userId: user._id }).count();
        var unsubscribeLink = "http://xboxdash.us11.list-manage1.com/unsubscribe?u=c66cacf1f6aa0c1dc079eeb16&id=1f53442338";

		if (user) {
			if (_.isEmpty(user.services)) {
				var userEmail = user.emails[0].address;
			} else {
				userEmail = user.services.facebook.email;
			}
		}

        Mandrill.messages.sendTemplate({
        	template_name: 'welcome-email',
        	template_content: [
	        	{
		        	name: 'FNAME',
		        	content: user.username
		        },
		        {
		        	name: 'ACOUNT',
		        	content: userAchievementsCount
		        },
		        {
		        	name: 'ATCOUNT',
		        	content: userTotalAchievements
		        },
		        {
		        	name: 'GCOUNT',
		        	content: userGamesCount
		        },
		        {
		        	name: 'GTCOUNT',
		        	content: userTotalGames
		        },
		        {
		        	name: 'UNSUB',
		        	content: unsubscribeLink
		        }
        	],
        	message: {
        		subject: "Welcome to XBdash, " + user.username,
        		to: [
        			{
	        			email: userEmail,
	        			name: user.username
	        		}
        		],
        		auto_text: true,
        		inline_css: true,
        		merge_language: 'mailchimp',
		        global_merge_vars: [
			        {
			        	name: 'FNAME',
			        	content: user.username
			        },
			        {
			        	name: 'ACOUNT',
			        	content: userAchievementsCount
			        },
			        {
			        	name: 'ATCOUNT',
			        	content: userTotalAchievements
			        },
			        {
			        	name: 'GCOUNT',
			        	content: userGamesCount
			        },
			        {
			        	name: 'GTCOUNT',
			        	content: userTotalGames
			        },
			        {
			        	name: 'UNSUB',
			        	content: unsubscribeLink
			        }
		        ],
		        merge_vars: [
		        	{
		        		rcpt: userEmail,
		        		vars: [
					        {
					        	name: 'FNAME',
					        	content: user.username
					        },
					        {
					        	name: 'ACOUNT',
					        	content: userAchievementsCount
					        },
					        {
					        	name: 'ATCOUNT',
					        	content: userTotalAchievements
					        },
					        {
					        	name: 'GCOUNT',
					        	content: userGamesCount
					        },
					        {
					        	name: 'GTCOUNT',
					        	content: userTotalGames
					        },
					        {
					        	name: 'UNSUB',
					        	content: unsubscribeLink
					        }
					    ]
					}
		        ]
		    }
		});

		Meteor.users.upsert({ _id: user._id }, { $set: { userSentWelcomeEmail: true } });
		Meteor._debug('welcome sent!');
		return;
    }
});