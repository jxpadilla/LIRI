// debugger;
var Twitter = require('twitter');
var spotify = require('spotify');
var twitterKeys = require("./keys.js");
var request = require('request');
var fs = require('fs');
var client = new Twitter(twitterKeys.twitterKeys);
var defaultSong = 'The Sign';
var defaultMovie = 'Mr. Nobody';
var defaultInput = process.argv[2];
var defaultName = process.argv[3];

switch(defaultInput) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    getSpotify();
    break;
   case "movie-this" :
    movieThis();
    break;
  }


function myTweets(){
  fs.appendFileSync('log.txt','text','utf8'); 
  var params = {q: '@jimmyfallon', count: '0'};
  client.get('search/tweets', params, function(error, tweets, response){
    if (!error) {
      for (var i = 0; i < 20; i++) {
        console.log(tweets.statuses[i].text);
        console.log('==========================================================');
        }
    }else{
      console.log(error);
    }
  });
}


function spotifyThis(){
  if (defaultName === undefined) {
      spotify.search({type: 'track', query: '"The+Sign" artist:"Ace+of+Base"&limit=5'}, function (err,data) {
        if (err) {
          return console.log(err);
        } else {
          // console.log(data); console.log('Artist:', data.tracks.items[0].artists[0].name)
          console.log('Track:', data.tracks.items[0].name);
          console.log('Preview Link:', data.tracks.items[0].preview_url);
          console.log('Album:', data.tracks.items[0].album.name);
          }
      });
  } else {
      spotify.search({type: 'track', query: defaultName + '&limit=5'}, function (err,data) {
        if (err) {
          return console.log(err);
        } else {
          if (data.tracks.items.length === 0) {
            return console.log('Track not found, please try again');
          }
          // console.log(data);
          console.log('Artist:', data.tracks.items[0].artists[0].name);
          console.log('Track:', data.tracks.items[0].name);
          console.log('Preview Link:', data.tracks.items[0].preview_url);
          console.log('Album:', data.tracks.items[0].album.name);
          console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        }
      });        
  }
}
      
function movieThis(){
    request('http://www.omdbapi.com/?' + '&t' + '&plot=short&tomatoes=true&r=json',function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var movieObj = JSON.parse(body);
        if (movieObj.Response == 'False') {
            return console.log('Invalid movie title.');
        }else{
        console.log(movieObj.Title);
        console.log(movieObj.Year);
        console.log(movieObj.imdbRating);
        console.log(movieObj.Country);
        console.log(movieObj.Language);
        console.log(movieObj.Plot);
        console.log(movieObj.Actors);
        console.log(movieObj.tomatoRating);
        console.log(movieObj.tomatoURL);
        console.log('---------------------------------------------------------------');
       }
        }
    });
}
 

movieThis();
spotifyThis();
myTweets();


