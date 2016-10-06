debugger;
var keys = require("./keys.js");
var fs = require("fs");
var twits = new keys();
var twitterApiUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json";
var params = process.argv.slice(3);
//var twitter = new twits(

function initializer(){
  switch(process.argv[2]) {
    case "my-tweets":
      lastTweets ();
      // result = lastTweets(params);
      break;

    // case "spotify-this-song":
    //   result = spotify(params);
    //   break;

    // case "move-this":
    //   result = moveThis(params);
    //   break;

    // case "do-what-is-says":
    //   result = doIt(params);
      // break;
  }


function lastTweets(){
    var params = {screen_name: "jxpaustex"};
    twits.twitterKeys.get("statuses/user_timeline", params, function(err, tweets, response){
      if (!err) {
        console.log("Last 20 tweets:");
        for (var i = 0; i < 20; i++) {
          console.log((i+1)+". "+tweets[i].text);
        };
      } else if (err) {
        console.log(err);
      }
    });
};

console.log(result);

// var twit = new twitter(params);
// twit.get('http://api.twitter.com/1.1/statuses/user_timeline.json?count=2',{include_entities:false},);