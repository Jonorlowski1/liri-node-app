const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');
const moment = require('moment');
const keys = require('./keys.js');

require('dotenv').config();


// const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const search = process.argv.slice(3).join(" ");
const lineBreak = ('=').repeat(50);


console.log(search);

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
  // artist name
  // song name
  // preview song link
  // album name of current song
  spotify
    .search({ type: 'track', query: search })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    });
}

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

function spotifyFS() {
  // ?????????????????
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
    spotifyFS(search);
    break;
}