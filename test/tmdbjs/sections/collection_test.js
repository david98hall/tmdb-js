const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (apiKey, sessionId = undefined) => {

    let tmdb = new Tmdb(apiKey);

    describe('Collection GET tests', () => {

        let collection = {id: "304", name: "Ocean's Collection"};
        it('Should get collection data.', done => {
            tmdb.getCollections().getCollection(collection.id).getDetails().then(json => {

                // Assert the results
                assert.strictEqual(json.name, collection.name);

                setImmediate(done);
            })
        })

    });
}