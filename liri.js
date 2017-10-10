
	var fs = require("fs"); 
	var request = require("request");
	var keys = require("./keys.js");
	var Twitter = require('twitter');
	var spotify = require ('node-spotify-api');

	function myTweets() {
		var client = new Twitter(keys);
		params = {screen_name: 'AlexZ84775393', count: 20 };
		client.get("statuses/user_timeline/", params, function(error, data, response){
			if (!error) { 
				//console.log(args); // full data list
				 for(var i = 0; i < data.length; i++) {
				 	var tweetsText = data[i].text +"\n" + "Created on " + data[i].created_at + "\n";
					console.log(tweetsText);
				}
			}  else {
				console.log("Error :"+ error);
				return;
			}
		});
	};

	myTweets();
	