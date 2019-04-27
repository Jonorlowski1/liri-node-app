require('dotenv').config();

const keys = require('./keys.js');

const spotify = new Spotify(keys.spotify);

const command = process.argv[2];
const search = process.argv.slice(3).join(" ");

console.log(search);