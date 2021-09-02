const assert = require('assert');
const {TmdbClient} = require("../../../src/tmdb-js/tmdb-js");
const tmdbTestUtils = require('../utils/tmdb_test_utils');

exports.runTest = (authentication) => {

    let apiKey = authentication["apiKey"];

    let tmdb = new TmdbClient(apiKey);

    describe("Authentication tests", () => {

        xit('Should create a guest session.', async () => {
            let guestSessionID = await tmdb.getAuthenticator().createGuestSessionAsync();
            assert.ok(guestSessionID);
        });

        xit('Should create a session with login.', async () => {
            let loginInfo = await tmdbTestUtils.getLoginInformationAsync();
            let authenticator = tmdb.getAuthenticator();
            let sessionId = await authenticator.createLoginSessionAsync(loginInfo.username, loginInfo.password);
            assert.ok(sessionId);
            assert.ok(await authenticator.deleteSessionAsync(sessionId));
        });

        // Tests that do not work in CIs
        if (!process.env.CI) {

            xit('Should create a session without login.', async () => {

                let authenticator = tmdb.getAuthenticator();

                // Create a session
                const sessionId = await authenticator.createSessionAsync("chrome");
                assert.ok(sessionId);

                // Delete the session
                assert.ok(await authenticator.deleteSessionAsync(sessionId));
            }).timeout(15000);
        }
    });
}