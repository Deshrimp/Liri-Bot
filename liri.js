require("dotenv").config()
var keys = require("./keys.js")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)
var bandsintown = require("bandsintown")("codingbootcamp")

var request = require("request")
var fs = require("fs")

const PrintTrackInfo = data => {
  //destructure the response into the variables "url", "title", "albumtitle", and "artist"
  const {
    external_urls: { spotify: url },
    name: title,
    album: { name: albumtitle },
    artists: {
      0: { name: artist }
    }
  } = data
  // Log out the information we got
  console.log(`Artist: ${artist}`)
  console.log(`Song title: ${title}`)
  console.log(`Spotify URL: ${url}`)
  console.log(`Album title: ${albumtitle}`)
}

async function read(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function getCommand() {
  const arg = process.argv[2]
  if (arg === "do-what-it-says") {
    try {
      const random = await read("random.txt")
      const args = random.split(/,/)
      return args
    } catch (err) {
      console.log(err)
    }
  } else return process.argv.slice(2)
}

async function ProcessCommand(args) {
  const command = args[0]
  switch (command) {
    case "concert-this":
      var artist = args[1]
      bandsintown.getArtistEventList(artist).then(function(events) {
        console.log("Artist: " + events[0].artists[0].name)
        console.log("----------Events----------")
        for (var i = 0; i < events.length; i++) {
          console.log("Event: " + events[i].title)
          console.log("When: " + events[i].formatted_datetime)
          console.log(
            "Where: " +
              events[i].venue.place +
              " " +
              events[i].formatted_location
          )
          console.log("Tickets: " + events[i].ticket_status)
          console.log("------------------------------------------")
        }
      })
      break
    case "spotify-this-song":
      const song = args[1]
      let data
      if (!song)
        data = await spotify.request(
          "https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE"
        )
      else
        data = await spotify
          .search({ type: "track", query: song })
          .then(r => r.tracks.items[0])
      PrintTrackInfo(data)
      break
    case "movie-this":
      var movies = args[1]
      //var movies = "The Matrix"
      if (!movies) {
        request(
          "https://www.omdbapi.com/?t=Mr. Nobody&y=&plot=short&apikey=trilogy",
          function(error, response, body) {
            if (!error && response.statusCode == 200) {
              var data = JSON.parse(body)
              console.log("Movie: " + data.Title)
              console.log("Year: " + data.Year)
              console.log("IMDB Rating: " + data.imdbRating)
              console.log("Rotten Tomatoes Rating: No Rating")
              console.log("Country: " + data.Country)
              console.log("Language: " + data.Language)
              console.log("Plot: " + data.Plot)
              console.log("Actors: " + data.Actors)
            }
          }
        )
      } else {
        request(
          "https://www.omdbapi.com/?t=" +
            movies +
            "&y=&plot=short&apikey=trilogy",
          function(error, response, body) {
            if (!error && response.statusCode == 200) {
              var data = JSON.parse(body)
              console.log("Movie: " + data.Title)
              console.log("Year: " + data.Year)
              console.log("IMDB Rating: " + data.imdbRating)
              console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value)
              console.log("Country: " + data.Country)
              console.log("Language: " + data.Language)
              console.log("Plot: " + data.Plot)
              console.log("Actors: " + data.Actors)
            }
          }
        )
      }

      break

    default:
      console.log("hi")
  }
}

getCommand().then(args => ProcessCommand(args))
