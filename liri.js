require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
const Spotify = require('node-spotify-api');

const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const search = process.argv.slice(3).join(" ");
const lineBreak = ('=').repeat(50);

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

function spotifyFunc() {
  spotify
    .search({ type: 'track', query: search })
    .then(function (response) {
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


function fsRead(newCommand, newSearch) {

}

switch (command) {
  case 'concert-this':
    bandsInTownFunc(search);
    break;

  case 'spotify-this-song':
    spotifyFunc(search);
    break;

  case 'movie-this':
    omdbFunc(search);
    break;

  case 'do-what-it-says':
    fs.readFile('random.txt', 'utf8', function (error, data) {
      const newCommand = data.split(',')[0]
      const newSearch = data.split(',')[1].replace(/['"]+/g, '');

      if (error) {
        return console.log(error);
      } else {
        console.log(newCommand);
        console.log(newSearch);
        // spotifyFunc(newSearch);
        // omdbFunc(newSearch);
      }
    })
    break;
}