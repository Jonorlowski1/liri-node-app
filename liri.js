require('dotenv').config();

const keys = require('./keys.js');

// const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const search = process.argv.slice(3).join(" ");

console.log(search);

function bandsInTownFunc() {

}

function spotifyFunc() {

}

function omdbFunc() {

}

function spotifyFS() {

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