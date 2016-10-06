console.log("The bot is starting.")

var Twitter = require('twitter');
var config = require('./config');
console.log(config);
var T = new Twitter(config);
