const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;
const tmdbUtils = require('../../../src/utils/tmdb_utils');

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('Account GET tests', () => {
        
            // TODO [david98hall, 2021-08-15]: Test all GET methods

            xit('Should get account details.', async () => {

                var sessionId = await tmdbUtils.createSession(apiKey);
                assert.ok(sessionId);

                var accountDetails = await tmdb.getAccounts().getDetails(sessionId);
                assert.ok(accountDetails);
                assert.strictEqual(9370799, accountDetails.id);

                assert.ok(await tmdbUtils.deleteSession(apiKey, sessionId));
            })
    
            xit('Should get the favorite movies of an account.', async () => {

                var sessionId = await tmdbUtils.createSession(apiKey);
                assert.ok(sessionId);

                const page = 1;
                var account = tmdb.getAccounts().getAccount(9370799);
                var favoriteMovies = await account.getFavoriteMovies(sessionId, page);
                assert.ok(favoriteMovies);
                assert.strictEqual(page, favoriteMovies.page);

                assert.ok(await tmdbUtils.deleteSession(apiKey, sessionId));
            })
        });

        describe("Account SET tests", () => {
            
            xit('Should mark a movie as a favorite and then remove the marking.', async () => {

                var sessionId = await tmdbUtils.createSession(apiKey);
                assert.ok(sessionId);

                var account = tmdb.getAccounts().getAccount(9370799);
                const movieId = 161;

                var addFavoriteSuccessful = await account.setMovieFavoriteStatus(sessionId, movieId, true);
                assert.ok(addFavoriteSuccessful);

                var removeFavoriteSuccessful = await account.setMovieFavoriteStatus(sessionId, movieId, false);
                assert.ok(removeFavoriteSuccessful);

                assert.ok(await tmdbUtils.deleteSession(apiKey, sessionId));
            })

            xit('Should add a TV show to the watchlist and then remove it.', async () => {

                var sessionId = await tmdbUtils.createSession(apiKey);
                assert.ok(sessionId);

                var account = tmdb.getAccounts().getAccount(9370799);
                const tvShowId = 63174;

                var addToWatchlistSuccessful = await account.setTvShowWatchlistStatus(sessionId, tvShowId, true);
                assert.ok(addToWatchlistSuccessful);

                var removeFromWatchlistSuccessful = await account.setTvShowWatchlistStatus(sessionId, tvShowId, false);
                assert.ok(removeFromWatchlistSuccessful);

                assert.ok(await tmdbUtils.deleteSession(apiKey, sessionId));
            })
        });
    }
}