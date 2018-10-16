require("dotenv").config()
var keys = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)
var command = process.argv[2]

switch (command) {
  case "concert-this":
    var artist = process.argv[3]

    spotify.search({ type: "track", query: "All the Small Things" }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err)
      }

      console.log(data)
    })
    /*  1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")*/
    break
  case "spotify-this-song":
    const song = process.argv[3]
    if (!song) {
      console.log("Put a song as the fourth argument to this command!")
      return
    }
    spotify
      .search({ type: "track", query: song })
      .then(function(response) {
        //destructure the response into the variables "url", "title", "albumtitle", and "artist"
        const {
          external_urls: { spotify: url },
          name: title,
          album: { name: albumtitle },
          artists: {
            0: { name: artist }
          }
        } = response.tracks.items[0]
        // Log out the information we got
        console.log(`Spotify URL: ${url}`)
        console.log(`Song title: ${title}`)
        console.log(`Album title: ${albumtitle}`)
        console.log(`Artist: ${artist}`)
      })
      .catch(function(err) {
        console.log(err)
      })
    /*2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
   * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).*/
    break
  case "movie-this":
    var movie = process.argv[3]
    break
  case "do-what-it-says":
    var command = process.argv[3]
    break
  default:
}
