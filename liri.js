
	var fs = require("fs"); 
	var request = require("request");
	var keys = require("./keys.js");
	var Twitter = require('twitter');
	var Spotify = require ('node-spotify-api');

	// function myTweets() {
	// 	var client = new Twitter(keys);
	// 	params = {screen_name: 'AlexZ84775393', count: 20 };
	// 	client.get("statuses/user_timeline/", params, function(error, data, response){
	// 		if (!error) { 
	// 			//console.log(args); // full data list
	// 			 for(var i = 0; i < data.length; i++) {
	// 			 	var tweetsText = data[i].text +"\n" + "Created on " + data[i].created_at + "\n";
	// 				console.log(tweetsText);
	// 			}
	// 		}  else {
	// 			console.log("Error :"+ error);
	// 			return;
	// 		}
	// 	});
	// };

	// myTweets();

	function spotifyThisSong(song) {
		var spotify = new Spotify(keys);
		var song = process.argv[2];
		if(!song){
			song = "The Sign";
		}
		params = song;
		spotify.search({ type: "track", query: params }, function(err, data) {
			if(!err){
				var songData = data.tracks.items;
					if (songData[0] != undefined) {
						var responseBack =
						"Artist: " + songData[0].artists[0].name + "\n" +
						"Song: " + songData[0].name + "\n" +
						"Preview Url: " + songData[0].preview_url + "\n" +						
						"Album the song is from: " + songData[0].album.name +"\n";
						console.log(responseBack);
					}
			}	else {
				console.log("Error :"+ err);
				return;
			}
		});
	};

	spotifyThisSong();

	// function movieThis(){
	// 	var movie = process.argv[2];
	// 	if(!movie){
	// 		movie = "mr nobody";
	// 	}
	// 	params = movie
	// 	request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
	// 		if (!error && response.statusCode == 200) {
	// 			var movieBody = JSON.parse(body);
	// 			//console.log(movieObject); 
	// 			var toDisplay = "Title: " + movieBody.Title +"\n"+
	// 			"Year: " + movieBody.Year + "\n"+
	// 			"Imdb Rating: " + movieBody.imdbRating + "\n"+
	// 			"Rotten Tomatoes Rating: " + movieBody.Ratings[1].Value +"\n"+
	// 			"Country: " + movieBody.Country +"\n"+
	// 			"Language: " + movieBody.Language +"\n"+
	// 			"Plot: " + movieBody.Plot +"\n"+
	// 			"Actors: " + movieBody.Actors +"\n";
	// 			console.log(toDisplay);
	// 		} else {
	// 			console.log("Error :"+ error);
	// 			return;
	// 		}
	// 	});
	// };

	// movieThis();
	