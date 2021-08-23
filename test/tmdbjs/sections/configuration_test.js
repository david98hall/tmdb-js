const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (apiKey, sessionId = undefined) => {

    let tmdb = new Tmdb(apiKey);

    describe('Configuration GET query tests', () => {

        // TODO [david98hall, 2021-08-14]: Test all GET query methods

        it('Should find API configuration data.', done => {
            
            tmdb.getConfigurations().getApiConfiguration().then(json => {
              
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            })
        });

        it('Should find country configuration data.', done => {
            
            tmdb.getConfigurations().getCountries().then(json => {
              
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            })
        });

        it('Should find job configuration data.', done => {
            
            tmdb.getConfigurations().getJobs().then(json => {
              
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            })
        });

        it('Should find language configuration data.', done => {
            
            tmdb.getConfigurations().getLanguages().then(json => {
              
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            })
        });

        it('Should find primary translation configuration data.', done => {
            
            tmdb.getConfigurations().getPrimaryTranslations().then(json => {
              
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            })
        });

        it('Should find timezone configuration data.', done => {
            
            tmdb.getConfigurations().getTimezones().then(json => {
              
                // Assert the results
                assert.ok(json);
                
                setImmediate(done);
            })
        });
    });
}