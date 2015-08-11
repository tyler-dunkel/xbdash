newsPolygon = new Mongo.Collection('newspolygon');

newsPolygon.initEasySearch('title', {
	'limit': 10,
	'use': 'mongo-db'
});