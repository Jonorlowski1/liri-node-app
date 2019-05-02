#LIRI Bot Application

##*Welcome to LIRI Bot!*
###This application allows the user to search for a song through Spotify's API, a movie through and 'IMDB' Axios call, and a concert date through a 'Bands In Town' Axios Call.

##All requests will be made using the command line.

####_To Search for a Song:_
1. Type into the command line: **"node liri.js spotify-this-song"**.
2. Add the song name you wish to search at the end of the command line.
3. Press Enter.
* The search result will return:
  * Artist
  * Song Title
  * 30 Second Song Preview
  * Album Title the Song is from

####_To Search for a Movie:_
1. Type into the command line: **"node liri.js movie-this"**.
2. Add the movie name you wish to search at the end of the command line.
3. Press Enter.
* The search result will return:
  * Title
  * Year
  * IMDB Rating
  * Rotten Tomatoes Rating
  * Country of Production
  * Language
  * Plot
  * Actors


####_To Search for a Concert:_
1. Type into the command line: **"node liri.js concert-this"**.
2. Add the artist's name you wish to search at the end of the command line for their soonest concert information.
3. Press Enter.
* The search result will return:
  * Venue Name
  * Location
  * Date

####_Run Searches with fs.readFile:_
1. Edit the random.txt file with:
    1. **A new command:**
        * spotify-this
        * movie-this
        * concert-this
   2. **A new search parameter:**
        * "Twist and Shout"
        * "Hateful Eight"
        * "John Mayer"
2. Type into the command line: **"node liri.js do-what-it-says"**.
3. Press Enter.

[View working example HERE!](https://drive.google.com/file/d/1HZDxSQzbwZAZXyhXtToXpaU9NIh7y7Dq/view)