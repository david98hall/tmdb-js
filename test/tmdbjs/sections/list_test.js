const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;
const tmdbUtils = require('../../../src/utils/tmdb_utils');

exports.runTest = apiKey => {

    var tmdb = new Tmdb(apiKey);

    describe('List GET query tests', () => {

        // TODO [david98hall, 2021-08-15]: Add tests

    });

    // Don't test non-deterministic functions on the CI
    if (!process.env.CI) {
        describe('List session query tests', () => {

            xit('Create and delete a list.', async () => {

                var sessionId = await tmdbUtils.createSession(apiKey);
                assert.ok(sessionId);

                var listObj = {
                    name: `list ${(+new Date).toString(36)}`,
                    description: "I am just testing my API wrapper.",
                    language: "en-US"
                };

                // Create a new list
                var list = await tmdb.getLists()
                    .createList(listObj.name, listObj.description, listObj.language, sessionId);
                
                assert.ok(list);

                // Assert that the list details are as expected
                var listDetails = await list.getDetails();
                assert.strictEqual(listDetails.name, listObj.name);

                // Delete the created list
                assert.ok(await list.delete(sessionId)); // TODO [david98hall, 2021-08-22]: Failing due to external problem?
            });

            xit('Should add a movie to a list and then remove it.', async () => {

                var sessionId = await tmdbUtils.createSession(apiKey);
                assert.ok(sessionId);

                var listObj = {
                    name: `list ${(+new Date).toString(36)}`,
                    description: "I am just testing my API wrapper.",
                    language: "en-US"
                };

                // Create a new list
                var list = await tmdb.getLists()
                    .createList(listObj.name, listObj.description, listObj.language, sessionId);
                assert.ok(list);
                    
                // Add a movie to the list and then remove it
                const movieId = 18;
                assert.ok(await list.addMovie(movieId, sessionId));
                assert.ok(await list.removeMovie(movieId, sessionId));

                // Delete list
                assert.ok(await list.delete()); // TODO [david98hall, 2021-08-22]: Failing due to external problem?
            });
    
        });
    }
}