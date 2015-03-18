var Schema = {};

/* ----------
	User schema 
	Notes needed here
	-----------
*/
Schema.User = new SimpleSchema({
	// gamertag: {
	// 	type: String;
	// },
	emails: {
		type: [Object],
		optional: true
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true,
	},
	profile: {
		type: Object
	}
});

Meteor.users.attachSchema(Schema.User);