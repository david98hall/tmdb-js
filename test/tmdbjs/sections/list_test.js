const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (apiKey, sessionId) => {

    let tmdb = new Tmdb(apiKey);

    describe('List GET query tests', () => {

        // TODO [david98hall, 2021-08-15]: Add tests

    });

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {

        describe('List session query tests', () => {

            it('Create and delete a list.', async () => {

                let listObj = {
                    name: `list ${(+new Date).toString(36)}`,
                    description: "I am just testing my API wrapper.",
                    language: "en-US"
                };

                // Create a new list
                let list = await tmdb.getListSection()
                    .createListAsync(listObj.name, listObj.description, listObj.language, sessionId);
                assert.ok(list); // TODO [david98hall, 2021-08-23]: Fix the error that occurs here

                // Assert that the list details are as expected
                let listDetails = await list.getDetailsAsync();
                assert.strictEqual(listDetails.name, listObj.name);

                // Delete the created list
                assert.ok(await list.deleteAsync(sessionId));
            });

            it('Should add a movie to a list and then remove it.', async () => {

                let listObj = {
                    name: `list ${(+new Date).toString(36)}`,
                    description: "I am just testing my API wrapper.",
                    language: "en-US"
                };

                // Create a new list
                let list = await tmdb.getListSection()
                    .createListAsync(listObj.name, listObj.description, listObj.language, sessionId);
                assert.ok(list); // TODO [david98hall, 2021-08-23]: Fix the error that occurs here
                    
                // Add a movie to the list and then remove it
                const movieId = 18;
                assert.ok(await list.addMovieAsync(movieId, sessionId));
                assert.ok(await list.removeMovieAsync(movieId, sessionId));

                // Delete list
                assert.ok(await list.deleteAsync(sessionId));
            });
        });
    }
}