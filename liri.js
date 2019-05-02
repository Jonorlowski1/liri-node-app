require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
const Spotify = require('node-spotify-api');

const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);

const search = process.argv.slice(3).join(" ");
const lineBreak = (chalk`{red.bold =}`).repeat(50);

// FINISHED BANDS IN TOWN CALL
function bandsInTownFunc() {
  axios.get('https://rest.bandsintown.com/artists/' + search + '/events?app_id=codingbootcamp').then(
    function (response) {
      const data = response.data[0];
      console.log(lineBreak);
      console.log(chalk`{blue.bold Venue Name: }` + data.venue.name)
      console.log(chalk`{blue.bold Location: }` + data.venue.city + ', ' + data.venue.region)
      console.log(chalk`{blue.bold Date: }` + moment(data.datetime).format('MM/DD/YYYY'))
    }
  )
}

// FINISHED SPOTIFY CALL
const spotifyFunc = function(songName) {
  if (songName === undefined) {
    songName = "What's my age again";
  }

  spotify
    .search({ type: 'track', query: songName })
    .then(function (response) {
      console.log(lineBreak);
      const songData = response.tracks.items[0];

      console.log(chalk`{magenta.underline Artist: }` + songData.artists[0].name);
      console.log(chalk`{magenta.underline Song: }` + songData.name)
      console.log(chalk`{magenta.underline 30 Second Preview: }` + songData.preview_url);
      console.log(chalk`{magenta.underline Album: }` + songData.album.name);
    })
    .catch(function (err) {
      console.log(err);
    })
}

// FINISHED OMDB CALL
function omdbFunc() {
  axios.get('http://www.omdbapi.com/?t=' + search + '&apikey=d87ed0ea&type=movie').then(
    function (response) {
      const data = response.data;
      console.log(lineBreak);
      // console.log(response.data)
      console.log(chalk`{red.bold Title: }` + data.Title)
      console.log(chalk`{red.bold Year: }` + data.Year)
      console.log(chalk`{red.bold IMDB Rating: }` + data.imdbRating)
      console.log(chalk`{red.bold Rotten Tomatoes Rating: }` + data.Ratings[1].Value)
      console.log(chalk`{red.bold Country: }` + data.Country)
      console.log(chalk`{red.bold Language: }` + data.Language)
      console.log(chalk`{red.bold Plot: }` + data.Plot)
      console.log(chalk`{red.bold Actors: }` + data.Actors)
    }
  )
}

// FINISHED FS READ FILE / SPOTIFY FUNCTION
const doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    const dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

const pick = function(caseData, functionData) {
  switch (caseData) {
  case 'concert-this':
    bandsInTownFunc(functionData);
    break;

  case 'spotify-this-song':
    spotifyFunc(functionData);
    break;

  case 'movie-this':
    omdbFunc(functionData);
    break;

  case 'do-what-it-says':
    doWhatItSays();
    break;
  default:
    console.log("LIRI doesn't know that");
}
}

const runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv.slice(3).join(" "));