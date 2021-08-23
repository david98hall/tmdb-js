const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;
const tmdbUtils = require('../../../src/utils/tmdb_utils');

exports.runTest = (apiKey, sessionId) => {

    let tmdb = new Tmdb(apiKey);

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('Account GET tests', () => {
        
            // TODO [david98hall, 2021-08-15]: Test all GET methods

            it('Should get account details.', async () => {

                let accountDetails = await tmdb.getAccounts().getDetails(sessionId);
                assert.ok(accountDetails);
                assert.strictEqual(9370799, accountDetails.id);
            });
    
            it('Should get the favorite movies of an account.', async () => {

                const page = 1;
                let account = tmdb.getAccounts().getAccount("9370799");
                let favoriteMovies = await account.getFavoriteMovies(sessionId, page);
                assert.ok(favoriteMovies);
                assert.strictEqual(page, favoriteMovies.page);
            });
        });

        describe("Account SET tests", () => {
            
            it('Should mark a movie as a favorite and then remove the marking.', async () => {

                let account = tmdb.getAccounts().getAccount("9370799");
                const movieId = 161;

                let addFavoriteSuccessful = await account.setMovieFavoriteStatus(sessionId, movieId, true);
                assert.ok(addFavoriteSuccessful);

                let removeFavoriteSuccessful = await account.setMovieFavoriteStatus(sessionId, movieId, false);
                assert.ok(removeFavoriteSuccessful);
            });

            it('Should add a TV show to the watchlist and then remove it.', async () => {

                let account = tmdb.getAccounts().getAccount("9370799");
                const tvShowId = 63174;

                let addToWatchlistSuccessful = await account.setTvShowWatchlistStatus(sessionId, tvShowId, true);
                assert.ok(addToWatchlistSuccessful);

                let removeFromWatchlistSuccessful = await account.setTvShowWatchlistStatus(sessionId, tvShowId, false);
                assert.ok(removeFromWatchlistSuccessful);
            });
        });
    }
}