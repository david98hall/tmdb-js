const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new Tmdb(apiKey);

    describe('Collection GET tests', () => {

        let collection = {id: "304", name: "Ocean's Collection"};
        it('Should get collection data.', done => {
            tmdb.getCollectionSection().getCollection(collection.id).getDetailsAsync().then(json => {

                // Assert the results
                assert.strictEqual(json.name, collection.name);

                setImmediate(done);
            })
        })

        it("Should get image data.", async () => {
            let imageData = await tmdb.getCollectionSection().getCollection(collection.id).getImagesAsync();
            assert.ok(imageData);
            assert.ok(imageData["id"]);
        });

        it("Should get translation data.", async () => {
            let data = await tmdb.getCollectionSection().getCollection(collection.id).getTranslationsAsync();
            assert.ok(data);
            assert.ok(data["id"]);
        });
    });
}