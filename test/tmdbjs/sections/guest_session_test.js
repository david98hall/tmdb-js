const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;
const tmdbUtils = require('../../../src/utils/tmdb_utils');

exports.runTest = (apiKey, sessionId = undefined) => {

    let tmdb = new Tmdb(apiKey);

    describe('Guest session GET query tests', () => {

        it('Should find the rated movies of a guest session.', async () => {

            let guestSessionId = await tmdbUtils.createGuestSession(apiKey);
            assert.ok(guestSessionId);

            let ratedMovies = await tmdb.getGuestSessions()
                                        .getGuestSession(guestSessionId)
                                        .getRatedMovies();
            assert.ok(ratedMovies);
        });

        it('Should find the rated TV shows of a guest session.', async () => {

            let guestSessionId = await tmdbUtils.createGuestSession(apiKey);
            assert.ok(guestSessionId);

            let ratedTvShows = await tmdb.getGuestSessions()
                                         .getGuestSession(guestSessionId)
                                         .getRatedTvShows();
            assert.ok(ratedTvShows);
        });

        it('Should find the rated TV show episodes of a guest session.', async () => {

            let guestSessionId = await tmdbUtils.createGuestSession(apiKey);
            assert.ok(guestSessionId);

            let ratedEpisodes = await tmdb.getGuestSessions()
                                          .getGuestSession(guestSessionId)
                                          .getRatedTvShowEpisodes();
            assert.ok(ratedEpisodes);
        });

    });
}