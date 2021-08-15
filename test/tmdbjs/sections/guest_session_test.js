const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;
const tmdbTestUtils = require('../utils/tmdb_test_utils');
const tmdbUtils = require('../../../src/utils/tmdb_utils');
const timeWindows = tmdbUtils.timeWindows;

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    describe('Guest session GET query tests', () => {

        it('Should find the rated movies of a guest session.', async () => {
            
            var guestSessionId = await tmdbUtils.createGuestSession(apiKey);
            assert.ok(guestSessionId);

            var ratedMovies = await tmdb.getGuestSessions()
                                        .getGuestSession(guestSessionId)
                                        .getRatedMovies();
            assert.ok(ratedMovies);
        });

        it('Should find the rated TV shows of a guest session.', async () => {
            
            var guestSessionId = await tmdbUtils.createGuestSession(apiKey);
            assert.ok(guestSessionId);

            var ratedTvShows = await tmdb.getGuestSessions()
                                         .getGuestSession(guestSessionId)
                                         .getRatedTvShows();
            assert.ok(ratedTvShows);
        });

        it('Should find the rated TV show episodes of a guest session.', async () => {
            
            var guestSessionId = await tmdbUtils.createGuestSession(apiKey);
            assert.ok(guestSessionId);

            var ratedEpisodes = await tmdb.getGuestSessions()
                                          .getGuestSession(guestSessionId)
                                          .getRatedTvShowEpisodes();
            assert.ok(ratedEpisodes);
        });

    });
}