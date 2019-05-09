//--------------------Step 7 of homework instructions-----------------------------
require("dotenv").config();
var axios = require("axios");

// /require request
var request = require("request");

// require moment
var moment = require("moment");

// requre bands in town
// var bandsintown = require('bandsintown')("codingbootcamp");
// var bandsintown = require('bandsintown')



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

// var Spotify = require("node-spotify-api")
// spotify = new Spotify(keys1.spotify);

//ombd and bands in town apis
var omdb = (keys.omdb);
// var bandsintown = (keys.bandsintown)


//--Take user command and input---
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");




//the code below allows us to access the keys -- APP logic
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


            // console.log(response.data);
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
    var concertData = "http://rest.bandsintown.com" + userQuery + "/events?app_id=" + keys.bands.id
    // if (!userQuery) { userQuery = "Mr Nobody" };
    // console.log(movieData)

    axios.get(concertData)
        .then(function (response) {


            console.log(response.data);
            // console.log("-----------------------------------------------------------")

            // console.log("-----------------------------------------------------------")
        }
        );
}


//trying to get my information to print in the random.txt file
function doThis() {
    fs.readFile("random.txt", "utf8", function (err, data) {

        if (err) {
            log(err);

            var readArray = data.split(",");

            userInput = readArray[1];

            spotifyInfor(userInput);

        }

    })
}








