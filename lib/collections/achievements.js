xbdAchievements = new Mongo.Collection('xbdachievements');

xbdAchievements.initEasySearch('name', {
	'limit': 10,
	'use': 'mongo-db'
});