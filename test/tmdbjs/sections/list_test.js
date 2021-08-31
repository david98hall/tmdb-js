const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];
    let sessionId = authentication["sessionId"];

    let tmdb = new Tmdb(apiKey);

    describe('List GET query tests', () => {

        // TODO [david98hall, 2021-08-15]: Add tests

    });

    describe('List session query tests', () => {

        xit('Create and delete a list.', async () => {

            let uniqueIdentifier = (+new Date).toString(36);
            let listObj = {
                name: `list ${uniqueIdentifier}`,
                description: `I am just testing my API wrapper (${uniqueIdentifier}).`,
                language: "en-US"
            };

            // Create a new list
            let list = await tmdb.getListSection()
                .createListAsync(listObj.name, listObj.description, listObj.language, sessionId);
            assert.ok(list);

            // Assert that the list details are as expected
            let listDetails = await list.getDetailsAsync();
            assert.strictEqual(listDetails.name, listObj.name);

            // Delete the created list
            assert.ok(await list.deleteAsync(sessionId));
        });

        xit('Should add a movie to a list and then remove it.', async () => {

            let uniqueIdentifier = (+new Date).toString(36);
            let listObj = {
                name: `list ${uniqueIdentifier}`,
                description: `I am just testing my API wrapper (${uniqueIdentifier}).`,
                language: "en-US"
            };

            // Create a new list
            let list = await tmdb.getListSection()
                .createListAsync(listObj.name, listObj.description, listObj.language, sessionId);
            assert.ok(list);

            // Add a movie to the list and then remove it
            const movieId = 18;
            assert.ok(await list.addMovieAsync(movieId, sessionId));
            assert.ok(await list.removeMovieAsync(movieId, sessionId));

            // Delete list
            assert.ok(await list.deleteAsync(sessionId));
        });
    });
}