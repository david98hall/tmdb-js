const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];
    let sessionId = authentication["sessionId"];

    let tmdb = new Tmdb(apiKey);

    describe('Account GET tests', () => {

        it('Should get details.', async () => {

            let accountDetails = await tmdb.getAccountSection().getDetailsAsync(sessionId);
            assert.ok(accountDetails);
            assert.ok(accountDetails["id"]);
        });

        it('Should get created lists.', async () => {

            let account = tmdb.getAccountSection().getAccount("9370799");
            let createdLists = await account.getCreatedListsAsync(sessionId);
            assert.ok(createdLists);
            assert.ok(createdLists["total_pages"]);
        });

        it('Should get favorite movies.', async () => {

            const page = 1;
            let account = tmdb.getAccountSection().getAccount("9370799");
            let favoriteMovies = await account.getFavoriteMoviesAsync(sessionId, page);
            assert.ok(favoriteMovies);
            assert.strictEqual(page, favoriteMovies["page"]);
        });

        it('Should get favorite TV shows.', async () => {

            const page = 1;
            let account = tmdb.getAccountSection().getAccount("9370799");
            let favoriteTvShows = await account.getFavoriteTvShowsAsync(sessionId);
            assert.ok(favoriteTvShows);
            assert.strictEqual(page, favoriteTvShows["page"]);
        });

        it('Should get rated movies.', async () => {

            const page = 1;
            let account = tmdb.getAccountSection().getAccount("9370799");
            let ratedMovies = await account.getRatedMoviesAsync(sessionId, page);
            assert.ok(ratedMovies);
            assert.strictEqual(page, ratedMovies["page"]);
        });

        it('Should get rated TV shows.', async () => {

            const page = 1;
            let account = tmdb.getAccountSection().getAccount("9370799");
            let rated = await account.getRatedTvShowsAsync(sessionId, page);
            assert.ok(rated);
            assert.strictEqual(page, rated["page"]);
        });

        it('Should get rated TV show episodes.', async () => {

            const page = 1;
            let account = tmdb.getAccountSection().getAccount("9370799");
            let rated = await account.getRatedTvShowEpisodesAsync(sessionId, page);
            assert.ok(rated);
            assert.strictEqual(page, rated["page"]);
        });

        it('Should get a movie watchlist.', async () => {

            const page = 1;
            let account = tmdb.getAccountSection().getAccount("9370799");
            let watchlist = await account.getMovieWatchlistAsync(sessionId, page);
            assert.ok(watchlist);
            assert.strictEqual(page, watchlist["page"]);
        });

        it('Should get a TV show watchlist.', async () => {

            const page = 1;
            let account = tmdb.getAccountSection().getAccount("9370799");
            let watchlist = await account.getTvShowWatchlistAsync(sessionId, page);
            assert.ok(watchlist);
            assert.strictEqual(page, watchlist["page"]);
        });
    });

    describe("Account SET tests", () => {

        it('Should mark a movie as a favorite and then remove the marking.', async () => {

            let account = tmdb.getAccountSection().getAccount("9370799");
            const movieId = "161";

            let addFavoriteSuccessful = await account.setMovieFavoriteStatusAsync(sessionId, movieId, true);
            assert.ok(addFavoriteSuccessful);

            let removeFavoriteSuccessful = await account.setMovieFavoriteStatusAsync(sessionId, movieId, false);
            assert.ok(removeFavoriteSuccessful);
        });

        it('Should mark a TV show as a favorite and then remove the marking.', async () => {

            let account = tmdb.getAccountSection().getAccount("9370799");
            const tvShowId = "63174";

            let addFavoriteSuccessful = await account.setTvShowFavoriteStatusAsync(sessionId, tvShowId, true);
            assert.ok(addFavoriteSuccessful);

            let removeFavoriteSuccessful = await account.setTvShowFavoriteStatusAsync(sessionId, tvShowId, false);
            assert.ok(removeFavoriteSuccessful);
        });

        it('Should add a TV show to the watchlist and then remove it.', async () => {

            let account = tmdb.getAccountSection().getAccount("9370799");
            const tvShowId = "63174";

            let addToWatchlistSuccessful = await account.setTvShowWatchlistStatusAsync(sessionId, tvShowId, true);
            assert.ok(addToWatchlistSuccessful);

            let removeFromWatchlistSuccessful = await account.setTvShowWatchlistStatusAsync(sessionId, tvShowId, false);
            assert.ok(removeFromWatchlistSuccessful);
        });
    });
}