// debugger;
var Twitter = require('twitter');
var twitterKeys = require("./keys.js");
var spotify = require('spotify');
var request = require('request');
var defaultName = process.argv[3];

switch(process.argv[2]) {
  case "my-tweets":
    getTweets();
    break;
  case "spotify-this-song":
    getSpotify();
    break;
   case "movie-this" :
    movieThis();
    break;
  }


function getTweets(){
  var client = new Twitter({
    consumer_key: 'DpZJaLOjYXjU4i7HyeReAVATS',
    consumer_secret: '2FXIaWLZVPFRGZsbiRwAUjmsswnRjPKc5iHO65ntxxA4GTQGAg',
    access_token_key: '783343334177722369-f4Sy7ua1HtXI7iIqGPIozPTTyIImdd6',
    access_token_secret: 'hwbgNVXG0WwIOAvdA7ivcsSbFSRqUrB61xE1WzJaCOZPe',
  });
   
  var params = {q: '@jimmyfallon', count: '0'};
  client.get('search/tweets', params, function(error, tweets, response){
    if (!error) {
      for (var i = 0; i < 5; i++) {
        console.log(tweets);
        }
    }else{
      console.log(error);
    }
  });
}

function getSpotify(){
  spotify.search({ type: 'track', query: (defaultName)}, function(err, data) {
  //   if (data.tracks.items[0].name === 'undefined'){
  //   spotify.search({ type: 'track', query: "What's my age again"});
  //   console.log("this is crap");
  // }
    if (err) {
        defaultName = "What's my age again";
        //getSpotify();
        console.log('Error occurred: ' + err);
        console.log("Artist: " +data.tracks.items[0].artists[0].name);
        return;
        }
    else if (data) {
      console.log("Displaying the top 3 hits from your search");
      for (var i = 0; i < 3; i++) {
        console.log("Artist: " +data.tracks.items[i].artists[0].name);
        console.log("Song Name: " +data.tracks.items[i].name);
        console.log("Preview Link: "+data.tracks.items[i].href);
        console.log("Album Name: "+data.tracks.items[i].album.name);
        }
      }
    });
  }



function movieThis(){
    request('http://www.omdbapi.com/?' + 't' + '&plot=short&tomatoes=true&r=json',function (error, response, body) {
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
       }
        }
    });
}
 

movieThis();
getSpotify();
getTweets();


