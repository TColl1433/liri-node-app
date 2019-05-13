//--------------------Step 7 of homework instructions-----------------------------
//require .env file
require("dotenv").config();

var axios = require("axios");



var moment = require('moment');
// require("moment/min/locales.min");

// console.log(moment.locale()); // cs


//require file systems
var fs = require("fs");

//--------------------Step 8 of homework instructions-----------------------------
var keys = require("./keys")

//--------------------Step 8 of homework instructions-----------------------------

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
});



//ombd and bands in town apis
var omdb = (keys.omdb);
// var bandsintown = (keys.bandsintown)


//--Take user command and input---
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");




//the code below allows us to access the keys -- APP logic
//Using a switch and case instead of if and else statement, we're passing the user input and user Query into
//the user command function
function userCommand(userInput, userQuery) {
    //make a decision based on the command
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(userQuery)
            break;
        default:
            console.log("What?")
            break;
    }
}
userCommand(userInput, userQuery);



//-------------------------------------------------------------------------------------------------------

function spotifyThisSong() {
    console.log(`\n-----------------------------------------\n\nSearching for.."${userQuery}"`);
    //if userquery is not found, pass value for ace of base;
    if (!userQuery) { userQuery = 'the sign ace of base' };

    // spotify search query format
    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        //put selected data into an array
        let spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nHere you go!..\n\nArtist: ${data.tracks.items[i].album.artists[0].name}
            \nSong: ${data.tracks.items[i].name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}
            \nAlbum: ${data.tracks.items[i].album.name}\n\n----------------------------------------`)
        };
    });
}







function movieThis() {
    if (!userQuery) { userQuery = "Mr Nobody" };
    var movieData = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=" + process.env.OMbd_API_key
    // 
    // console.log(movieData)

    axios.get(movieData).then(
        function (response) {


            console.log(response.data);
            console.log("-----------------------------------------------------------")
            console.log("Here you go...")
            console.log("\nTitle: " + response.data.Title);
            console.log("\nRelease Year: " + response.data.Year);
            console.log("\nimdbRating: " + response.data.imdbRating);
            // console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1])
            console.log("\nLocation: " + response.data.Country);
            console.log("\nLanguage: " + response.data.Language);
            console.log("\nPlot: " + response.data.Plot);
            console.log("\nActors: " + response.data.Actors);
            console.log("-----------------------------------------------------------")
        }
    );
}


function concertThis() {
    if (!userQuery) { userQuery = "The Lumineers" };
    // var concertData = "http://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp"
    var concertData = "http://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + process.env.BANDSINTOWN_API_KEY



    axios.get(concertData)
        .then(function (response) {
            var data = response.data
            // console.log(data);
            if (response.data.length > 0) {
                //changed the for loop so that it would only return the upcoming concert instead of all concerts (i<1)
                for (i = 0; i < 1; i++) {
                    console.log(`\n-------------------------------------------
                \nSearching for .... ${userQuery}'s next show....
                \n\nArtist: ${data[i].lineup[0]}
                \nVenue Name: ${data[i].venue.name}
                \nVenue Location: ${data[i].venue.latitude},${data[i].venue.longitude}
                \nVenue City: ${data[i].venue.city},${data[i].venue.country}
                \nDate: ${moment(data[i].datetime).format('MMMM Do YYYY, hh:mm a')}`)
                };
            } else {
                console.log("Sorry I can't find an upcoming show for this Artist")
            }

        }
        ).catch(function (err) { console.log(err) })
}










//trying to get my information to print into the random.txt file
function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) { return console.log(error); }


        var readArray = data.split(",");
        //taking objects from random.txt to pass as parameters
        userInput = readArray[0];
        userQuery = readArray[1];

        userCommand(userInput, userQuery);

    });
}












