xbdAchievements = new Mongo.Collection('xbdachievements');

rssFeeds = new Mongo.Collection('rssfeeds');

xbdAchievements.friendlySlugs('name');

xbdAchievements.initEasySearch('name', {
	'limit': 10,
	'use': 'mongo-db'
});