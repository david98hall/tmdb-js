# [tmdb-js](https://github.com/david98hall/tmdb-js) (Work In Progress)
[![Node.js CI](https://github.com/david98hall/tmdb-js/workflows/Node.js%20CI/badge.svg)](https://github.com/david98hall/tmdb-js/actions?query=workflow%3A%22Node.js+CI%22)
[![Node.js Package](https://github.com/david98hall/tmdb-js/workflows/Node.js%20Package/badge.svg)](https://github.com/david98hall/tmdb-js/actions?query=workflow%3A%22Node.js+Package%22)

An unofficial JavaScript wrapper for The Movie Database API.

[<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" width="33%">](https://www.themoviedb.org/)

### Installation

#### [GitHub Packages](https://github.com/david98hall/tmdb-js/packages/303001)
```
npm install @david98hall/tmdb-js
```

#### [npm](https://www.npmjs.com/package/tmdb-js)
```
npm i tmdb-js
```

#### Usage
Here is a simple example of how to use this wrapper:
```javascript
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;

var tmdb = new Tmdb(apiKey);

// Get movie data example
var oceansElevenMovie = tmdb.getMovies().getMovie(161);
oceansElevenMovie.getDetails().then(json => {
  console.log("A great movie: " + json.title)
})

// Rate movie example
oceansElevenMovie.rate(10, sessionId);

// Search TMDB examples
tmdb.getSearcher().searchMovies("Ocean's").then(resultPageJsons => console.log(resultPageJsons.length));
tmdb.getSearcher().searchMovies("Ocean's", 1, 1).then(resultPageJsons => console.log(resultPageJsons.length));
tmdb.getSearcher().multiSearch("Ocean's").then(resultPageJsons => console.log(resultPageJsons.length));
tmdb.getSearcher().multiSearch("Ocean's", 1, 2).then(resultPageJsons => console.log(resultPageJsons.length));
```

See the [documentation](https://david98hall.github.io/tmdb-js/) for more info.
