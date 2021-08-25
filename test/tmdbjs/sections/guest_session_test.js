const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;
const tmdbUtils = require('../../../src/utils/tmdb_utils');

exports.runTest = (apiKey, sessionId = undefined) => {

    let tmdb = new Tmdb(apiKey);

    describe('Guest session GET query tests', () => {

        it('Should find the rated movies of a guest session.', async () => {

            let guestSessionId = await tmdbUtils.createGuestSessionAsync(apiKey);
            assert.ok(guestSessionId);

            let ratedMovies = await tmdb.getGuestSessions()
                                        .getGuestSession(guestSessionId)
                                        .getRatedMoviesAsync();
            assert.ok(ratedMovies);
        });

        it('Should find the rated TV shows of a guest session.', async () => {

            let guestSessionId = await tmdbUtils.createGuestSessionAsync(apiKey);
            assert.ok(guestSessionId);

            let ratedTvShows = await tmdb.getGuestSessions()
                                         .getGuestSession(guestSessionId)
                                         .getRatedTvShowsAsync();
            assert.ok(ratedTvShows);
        });

        it('Should find the rated TV show episodes of a guest session.', async () => {

            let guestSessionId = await tmdbUtils.createGuestSessionAsync(apiKey);
            assert.ok(guestSessionId);

            let ratedEpisodes = await tmdb.getGuestSessions()
                                          .getGuestSession(guestSessionId)
                                          .getRatedTvShowEpisodesAsync();
            assert.ok(ratedEpisodes);
        });

    });
}