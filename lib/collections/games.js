xbdGames = new Mongo.Collection('xbdgames');

xbdGames.friendlySlugs('name');

xbdGames.initEasySearch('name', {
	'limit': 10,
	'use': 'mongo-db'
});