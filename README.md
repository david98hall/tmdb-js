# [tmdb-js](https://github.com/david98hall/tmdb-js)
[![Node.js CI](https://github.com/david98hall/tmdb-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/david98hall/tmdb-js/actions/workflows/node.js.yml)

https://github.com/david98hall/tmdb-js/actions/workflows/node.js.yml/badge.svg

An unofficial JavaScript wrapper for The Movie Database API.

[<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" width="33%">](https://www.themoviedb.org/)

### Installation

```
npm install tmdb-js-wrapper
```

#### Usage
Here is a simple example of how to use this wrapper:
```javascript
const {TmdbClient} = require('../../../src/tmdb-js/tmdb-js');

doStuff = async function(authentication) {

   let apiKey = authentication.apiKey;
   let username = authentication.username;
   let password = authentication.password;

   let tmdb = new TmdbClient(apiKey);

   // Get movie data example
   let oceansElevenMovie = tmdb.getMovieSection().getMovie("161");
   let oceansDetails = await oceansElevenMovie.getDetailsAsync();
   let oceansImages = await oceansElevenMovie.getImagesAsync();
   console.log("A great movie: " + oceansDetails.title);
   
   // Rate movie example
   let sessionId = await tmdb.getAuthenticator().createSessionAsync("chrome"); // One way of getting a session ID
   let ratingSuccessful1 = await oceansElevenMovie.rateAsync(10, sessionId);

   // Rate TV show episode example
   let loginSessionId = await tmdb.getAuthenticator().createLoginSessionAsync(username, password); // Another way of getting a session ID
   let gameOfThronesTvShow = tmdb.getTvShowSection().getTvShow("1399");
   let ratingSuccessful2 = await gameOfThronesTvShow.getEpisode(3, 9).rateAsync(10, sessionId);

   // Rate TV show as a guest example
   let guestSessionId = await tmdb.getAuthenticator().createGuestSessionAsync();
   let ratingSuccessful3 = await gameOfThronesTvShow.rateAsync(10, undefined, guestSessionId);

   // Search TMDB examples
   let searchSection = tmdb.getSearchSection();
   let searchResult1 = await searchSection.searchMoviesAsync("Ocean's");
   let searchResult2 = await searchSection.searchMoviesAsync("Ocean's", 1, 1);
   let searchResult3 = await searchSection.multiSearchAsync("Ocean's");
   let searchResult4 = await searchSection.multiSearchAsync("Ocean's", 1, 2);
}
```

See the [documentation](https://david98hall.github.io/tmdb-js/) for more info.
