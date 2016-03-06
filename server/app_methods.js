Meteor.methods({
    sendWelcomeEmail: function (userId) {
	    var userEmail;
    	var user = Meteor.users.findOne({ _id: userId });
        var userAchievementsCount = userAchievements.find({ userId: userId, progressState: true }).count();
        var userTotalAchievements = userAchievements.find({ userId: userId }).count();
        var userGamesCount = userGames.find({ userId: userId, completed: true }).count();
        var userTotalGames = userGames.find({ userId: userId }).count();

        if (!user) return;

		if (user.services) {
			if (user.services.facebook) {
				userEmail = user.services.facebook.email;
			} else if (user.services.twitter) {
				userEmail = user.services.twitter.email;
			} else {
				userEmail = user.emails[0].address;
			}
		} else {
			userEmail = user.emails[0].address;
		}

		try {
			Email.send({
			    to: user.username + "<" + user.emails[0].address + ">",
			    from: "XBdash <contact@email.xbdash.com>",
			    subject: "Welcome to XBdash, " + user.username,
			    html: SSR.render( 'welcomeEmail', {
					fName: user.username,
					aCount: userAchievementsCount,
					atCount: userTotalAchievements,
					gCount: userGamesCount,
					gtCount: userTotalGames
				}),
				'o:tag': 'alerts',
				'o:tracking-clicks': 'yes',
				'o:tracking-opens': 'yes'
			});

			// Mandrill.messages.sendTemplate({
			// 	template_name: 'welcome-email',
			// 	template_content: [
			//     	{
			//         	name: 'FNAME',
			//         	content: user.username
			//         },
			//         {
			//         	name: 'ACOUNT',
			//         	content: userAchievementsCount
			//         },
			//         {
			//         	name: 'ATCOUNT',
			//         	content: userTotalAchievements
			//         },
			//         {
			//         	name: 'GCOUNT',
			//         	content: userGamesCount
			//         },
			//         {
			//         	name: 'GTCOUNT',
			//         	content: userTotalGames
			//         },
			//         {
			//         	name: 'UNSUB',
			//         	content: unsubscribeLink
			//         }
			// 	],
			// 	message: {
			// 		subject: "Welcome to XBdash, " + user.username,
			// 		to: [
			// 			{
			//     			email: userEmail,
			//     			name: user.username
			//     		}
			// 		],
			// 		auto_text: true,
			// 		inline_css: true,
			// 		merge_language: 'mailchimp',
			//         global_merge_vars: [
			// 	        {
			// 	        	name: 'FNAME',
			// 	        	content: user.username
			// 	        },
			// 	        {
			// 	        	name: 'ACOUNT',
			// 	        	content: userAchievementsCount
			// 	        },
			// 	        {
			// 	        	name: 'ATCOUNT',
			// 	        	content: userTotalAchievements
			// 	        },
			// 	        {
			// 	        	name: 'GCOUNT',
			// 	        	content: userGamesCount
			// 	        },
			// 	        {
			// 	        	name: 'GTCOUNT',
			// 	        	content: userTotalGames
			// 	        },
			// 	        {
			// 	        	name: 'UNSUB',
			// 	        	content: unsubscribeLink
			// 	        }
			//         ],
			//         merge_vars: [
			//         	{
			//         		rcpt: userEmail,
			//         		vars: [
			// 			        {
			// 			        	name: 'FNAME',
			// 			        	content: user.username
			// 			        },
			// 			        {
			// 			        	name: 'ACOUNT',
			// 			        	content: userAchievementsCount
			// 			        },
			// 			        {
			// 			        	name: 'ATCOUNT',
			// 			        	content: userTotalAchievements
			// 			        },
			// 			        {
			// 			        	name: 'GCOUNT',
			// 			        	content: userGamesCount
			// 			        },
			// 			        {
			// 			        	name: 'GTCOUNT',
			// 			        	content: userTotalGames
			// 			        },
			// 			        {
			// 			        	name: 'UNSUB',
			// 			        	content: unsubscribeLink
			// 			        }
			// 			    ]
			// 			}
			//         ]
			//     }
			// });
		} catch (e) {
			logger.info('Error rendering Welcome email.', error);
			return;
		}
    }
});