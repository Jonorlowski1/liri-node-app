const axios = require('axios');

axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=d87ed0ea').then(
  function(response) {
    console.log(response.data);
  }
)