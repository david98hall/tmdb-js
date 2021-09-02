const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];
    let sessionId = authentication["sessionId"];

    let tmdb = new Tmdb(apiKey);

    describe('List query tests', () => {

        xit('Should create a list, get data from it and then delete it.', async () => {

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
            const movieId = "18";
            assert.ok(await list.addMovieAsync(movieId, sessionId));

            // Assert the status of the movie
            let movieStatus = await list.getItemStatusAsync(movieId);
            assert.ok(movieStatus);
            assert.ok(movieStatus["item_present"]);

            // Remove the movie
            assert.ok(await list.removeMovieAsync(movieId, sessionId));

            // Add a movie to the list and then remove it by clearing the list
            assert.ok(await list.addMovieAsync(movieId, sessionId));
            assert.ok(await list.clearAsync(sessionId));

            // Delete list
            assert.ok(await list.deleteAsync(sessionId));
        });
    });
}