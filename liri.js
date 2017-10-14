	// requiring all needed modules and npm packages
	var fs = require("fs"); 
	var request = require("request");
	var keys = require("./keys.js");
	var Twitter = require('twitter');
	var Spotify = require ('node-spotify-api');
	//creating switch statement to route all available commands via argv process
	var action = process.argv[2];
	switch(action) {
		case "my-tweets": myTweets(); 
		break;
		case "spotify-this-song": spotifyThisSong();
		break;
		case "movie-this": movieThis();
		break;
		case "do-what-it-says": doWhatItSays();
		break;		
	};
	//creating first part of the app functionality with twitter and wrapping it in a function
	function myTweets() {
		//pulling twitter key from  the keys file
		var client = new Twitter(keys.twitter);
		params = {screen_name: 'AlexZ84775393', count: 20 };
		//assembling twitter api call and displaying tweets from the data obj
		client.get("statuses/user_timeline/", params, function(error, data, response){
			if (!error) { 
				//console.log(data); 
				 for(var i = 0; i < data.length; i++) {
				 	var tweetsText = data[i].text +"\nCreated on " + data[i].created_at + "\n";
					console.log(tweetsText);
				}
			}  else {
				//error handling
				console.log("Error :" + error);
				return;
			}
		});
	};
	//creating second part of the app functionality with spotify api and wrapping it in a function
	function spotifyThisSong(song) {
		//pulling the key from keys file
		var spotify = new Spotify(keys.spotify);
		var song = process.argv[3];
		//if no song provided defaults to "the sign"
		if(!song){
			song = "The Sign";
		} else {
			// allows for multiple words song title
			var nodeArgs = process.argv;
			song = "";
			for (var i = 3; i < nodeArgs.length; i++) {
				if (i > 3 && i < nodeArgs.length) {
					song = song + "+" + nodeArgs[i];
				}
				else {
					song += nodeArgs[i];
				}
			}
		}
		//assembling spotify api call and building our resopnses from data obj
		spotify.search({ type: "track", query: song }, function(error, data) {
			if(!error){
				var songData = data.tracks.items;
					if (songData[0] != undefined) {
						var responseBack = "Artist: " + songData[0].artists[0].name + "\n" +
						"Song: " + songData[0].name + "\n" +
						"Preview Url: " + songData[0].preview_url + "\n" +						
						"Album the song is from: " + songData[0].album.name +"\n";
						console.log(responseBack);
					}
			}	else {
				console.log("Error :" + err);
				return;
			}
		});
	};
	//creating third part of the app functionality with omdb api and wrapping it in a function
	function movieThis(){
		var movie = process.argv[3];
		//if no movie given defaults to "mr nobody"
		if(!movie){
			movie = "mr nobody";
		} else {
			// allows for multiple words movie title
			var nodeArgs = process.argv;
			movie = "";
			for (var i = 3; i < nodeArgs.length; i++) {
				if (i > 3 && i < nodeArgs.length) {
					movie = movie + "+" + nodeArgs[i];
				}
				else {
					movie += nodeArgs[i];
				}
			}
		}
		// assembles an api call and builds response structure from a large response object
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
			if (!error && response.statusCode === 200) {
				var movieBody = JSON.parse(body);
				var toDisplay = "Title: " + movieBody.Title +"\n"+
				"Year: " + movieBody.Year + "\n"+
				"Imdb Rating: " + movieBody.imdbRating + "\n"+
				"Rotten Tomatoes Rating: " + movieBody.Ratings[1].Value +"\n"+
				"Country: " + movieBody.Country +"\n"+
				"Language: " + movieBody.Language +"\n"+
				"Plot: " + movieBody.Plot +"\n"+
				"Actors: " + movieBody.Actors +"\n";
				console.log(toDisplay);
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
	};
	//creating final part of the app functionality with file read and spotify and wrapping it in a function
	function doWhatItSays() {
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				//splitting txt file into an array and using last element as song input for spotify api call
				randomTxtArray = data.split(",");
				spotifyThisSong(randomTxtArray[1]);
			} else {
				console.log("Error :" + error);
			}
		});
	};
	