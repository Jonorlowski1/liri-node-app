const fs = require('fs');
const axios = require('axios');
const chalk = require('chalk');
const moment = require('moment');

require('dotenv').config();

const keys = require('./keys.js');

// const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const search = process.argv.slice(3).join(" ");
const lineBreak = ('=').repeat(50);


console.log(search);

function bandsInTownFunc() {
  axios.get('https://rest.bandsintown.com/artists/' + search + '/events?app_id=codingbootcamp').then(
    function(response) {
      const data = response.data[0];
      console.log(lineBreak);
      console.log(chalk`{green Venue Name: }` + data.venue.name)
      console.log(chalk`{green Location: }` + data.venue.city + ', ' + data.venue.region)
      console.log(chalk`{green Date: }` + moment(data.datetime).format('MM/DD/YYYY'))
      // console.log(chalk`That is not a recognized command. Please use the following format:\n{white.bold node liri.js} {blue command} {red search item} \n{blue.bold concert-this} {red.bold Band Name} (For finding concerts) \n{blue.bold spotify-this-song} {red.bold Song Name} (For finding song information) \n{blue.bold movie-this} {red.bold Movie Name} (For finding movie information) \n{blue.bold do-what-it-says} {red.bold No Input Needed} (For returning something random)`)
    }
  )
}


function spotifyFunc() {
// ?????????????????
}

function omdbFunc() {

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