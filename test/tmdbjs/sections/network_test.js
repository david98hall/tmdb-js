const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;
const tmdbTestUtils = require('../utils/tmdb_test_utils');

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    describe('Network GET query tests', () => {

        // TODO [david98hall, 2021-08-14]:  Test all GET query methods

        it('Should find data about a network.', done => {

            // Look for movie data
            var network = {"id":19, "name":"FOX"};
            
            tmdb.getNetworks().getNetwork(network.id).getDetails().then(json => {
              
                // Assert the results
                assert.strictEqual(json.name, network.name);
                
                setImmediate(done);
            })
        });
    });
}