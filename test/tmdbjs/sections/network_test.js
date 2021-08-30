const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('Network GET query tests', () => {

        // TODO [david98hall, 2021-08-14]:  Test all GET query methods

        it('Should find data about a network.', done => {

            // Look for movie data
            let network = {id: "19", name: "FOX"};

            tmdb.getNetworkSection().getNetwork(network.id).getDetailsAsync().then(json => {

                // Assert the results
                assert.strictEqual(json.name, network.name);

                setImmediate(done);
            });
        });
    });
}