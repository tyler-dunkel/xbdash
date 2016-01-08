xbdAchievements = new Mongo.Collection('xbdachievements');

xbdAchievements.friendlySlugs('name');

xbdAchievements.initEasySearch('name', {
	'limit': 10,
	'use': 'mongo-db'
});