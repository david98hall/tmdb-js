const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('Configuration GET query tests', () => {

        // TODO [david98hall, 2021-08-14]: Test all GET query methods

        it('Should find API configuration data.', done => {

            tmdb.getConfigurationSection().getApiConfigurationAsync().then(json => {

                // Assert the results
                assert.ok(json);

                setImmediate(done);
            });
        });

        it('Should find country configuration data.', done => {

            tmdb.getConfigurationSection().getCountriesAsync().then(json => {

                // Assert the results
                assert.ok(json);

                setImmediate(done);
            });
        });

        it('Should find job configuration data.', done => {

            tmdb.getConfigurationSection().getJobsAsync().then(json => {

                // Assert the results
                assert.ok(json);

                setImmediate(done);
            });
        });

        it('Should find language configuration data.', done => {

            tmdb.getConfigurationSection().getLanguagesAsync().then(json => {

                // Assert the results
                assert.ok(json);

                setImmediate(done);
            });
        });

        it('Should find primary translation configuration data.', done => {

            tmdb.getConfigurationSection().getPrimaryTranslationsAsync().then(json => {

                // Assert the results
                assert.ok(json);

                setImmediate(done);
            });
        });

        it('Should find timezone configuration data.', done => {

            tmdb.getConfigurationSection().getTimezonesAsync().then(json => {

                // Assert the results
                assert.ok(json);

                setImmediate(done);
            });
        });
    });
}