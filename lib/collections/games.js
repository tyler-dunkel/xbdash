xbdGames = new Mongo.Collection('xbdgames');

xbdGames.initEasySearch('name', {
	'limit': 10,
	'use': 'mongo-db'
});