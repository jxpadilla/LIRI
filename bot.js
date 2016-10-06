console.log("The bot is starting.");

var Twitter = require('twitter');
var config = require('./config');
console.log(config);
var T = new Twitter(config);

// function myTweets(){
// 	T.get('search/tweets', {q: '@katyperry', count: '20'}, function(err, tweets, response) {
// 		if (err) {
// 			return console.log(err);
// 		} else { 
// 			console.log(tweets);
// 			for (var i in tweets.statuses) {
// 				var num = parseInt(i) + 1;
// 				console.log('Tweet #' + num);
// 				console.log(tweets.statuses[i].text);
// 				console.log(tweets.statuses[i].created_at);
// 				console.log('========');

// 			var str = 'Tweet #' + num + '\n' + tweets.statuses[i].text + '\n' + tweets.statuses[i].created_at + 
// 			'\n========\n';
// 			fs.appendFileSync('log.txt', str, 'utf8');
// 			}
// 		}
// };

function myTweets() {
	var text = process.argv[0] + ' ' + process.argv[1] + ' ' + 'my-tweets\n\n';
	fs.appendFileSync('log.txt', text, 'utf8');
	T.get('search/tweets', {q: '@jimmyfallon', count: '20'}, function(err, tweets, response) {
		if (err) {
			return console.log(err);
		} else {
			// console.log(tweets)
			for (var i in tweets.statuses) {
				var num = parseInt(i) + 1;
				console.log('Tweet #' + num);
				console.log(tweets.statuses[i].text);
				console.log(tweets.statuses[i].created_at);
				console.log('========');

				var str = 'Tweet #' + num + '\n' + tweets.statuses[i].text + '\n' + tweets.statuses[i].created_at + '\n========\n';
				fs.appendFileSync('log.txt', str, 'utf8');
			}
			fs.appendFile('log.txt', '\n*****************************************\n\n', 'utf8', function(err) {
				if (err) {
					return console.log(err);
				}
				console.log('Log Now Updated!');
			});
		}
	});
}