// console.log("The bot is starting.");

var Twitter = require('twitter');
var config = require('./config');
// console.log(config);
var T = new Twitter(config);

	T.get('search/tweets', {q: '@jxpaustex', count: '20'}, function(err, tweets, response) {
		if (err) {
			return console.log(err);
		} else {
			console.log("success!");
		}
	});