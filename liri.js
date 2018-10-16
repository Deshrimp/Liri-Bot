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
      spotify
        .request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
        .then(function(data) {
          //  console.log(data.name)
          // console.log(data.albums.artists)

          const {
            external_urls: { spotify: url },
            name: title,
            album: { name: albumtitle },
            artists: {
              0: { name: artist }
            }
          } = data
          console.log(data)
          console.log(`Artist: ${artist}`)
          console.log(`Song title: ${title}`)
          console.log(`Spotify URL: ${url}`)
          console.log(`Album title: ${albumtitle}`)
        })
        .catch(function(err) {
          console.error("Error occurred: " + err)
        })

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
        console.log(`Artist: ${artist}`)
        console.log(`Song title: ${title}`)
        console.log(`Spotify URL: ${url}`)
        console.log(`Album title: ${albumtitle}`)
      })
      .catch(function(err) {
        console.log(err)
      })

    break
  case "movie-this":
    var movie = process.argv[3]
    break
  case "do-what-it-says":
    var command = process.argv[3]
    break
  default:
}
