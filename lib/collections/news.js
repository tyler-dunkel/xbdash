xbdNews = new Mongo.Collection('xbdnews');

xbdNews.initEasySearch('title', {
	'limit': 10,
	'use': 'mongo-db'
});