const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;
const tmdbUtils = require('../../../src/utils/tmdb_utils');
const timeWindows = tmdbUtils.timeWindows;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    const tmdb = new Tmdb(apiKey);

    describe('Trending media GET query tests', () => {

        it('Should find any trending media (time window: day).', async () => {

            let data = await tmdb.getTrendingSection(timeWindows.DAY).getAllAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should find any trending media (time window: week).', async () => {

            let data = await tmdb.getTrendingSection(timeWindows.WEEK).getAllAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should find trending movies (time window: day).', async () => {

            let data = await tmdb.getTrendingSection(timeWindows.DAY).getMoviesAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should find trending movies (time window: week).', async () => {

            let data = await tmdb.getTrendingSection(timeWindows.WEEK).getMoviesAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should find trending TV shows (time window: day).', async () => {

            let data = await tmdb.getTrendingSection(timeWindows.DAY).getTvShowsAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should find trending TV shows (time window: week).', async () => {

            let data = await tmdb.getTrendingSection(timeWindows.WEEK).getTvShowsAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should find trending people (time window: day).', async () => {

            let data = await tmdb.getTrendingSection(timeWindows.DAY).getPeopleAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });

        it('Should find trending people (time window: week).', async () => {

            let data = await tmdb.getTrendingSection(timeWindows.WEEK).getPeopleAsync();
            assert.ok(data);
            assert.ok(data["total_pages"]);
        });
    });
}