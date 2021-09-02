const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('Network GET query tests', () => {

        let network = {id: "19", name: "FOX"};

        it('Should get detail data.', done => {

            tmdb.getNetworkSection().getNetwork(network.id).getDetailsAsync().then(json => {

                // Assert the results
                assert.strictEqual(json.name, network.name);

                setImmediate(done);
            });
        });

        it("Should get alternative name data.", async () => {

            let section = tmdb.getNetworkSection().getNetwork(network.id);
            let data = await section.getAlternativeNamesAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });

        it("Should get image data.", async () => {

            let section = tmdb.getNetworkSection().getNetwork(network.id);
            let data = await section.getImagesAsync();

            assert.ok(data);
            assert.ok(data["id"]);
        });
    });
}