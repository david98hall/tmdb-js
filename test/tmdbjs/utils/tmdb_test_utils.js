const fs = require('fs').promises;
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;

/**
 * Instantiates a TMDb object with an API key.
 */
exports.getApiReadyTmdb = async function() {
    let apiKey = await exports.getApiKey();
    return new Tmdb(apiKey);
};

/**
 * Gets the API key from the file system.
 */
exports.getApiKey = async () => {
    if (process.env.TMDB_API_V3_KEY) {
        // If the TMDb API key can be found among the secrets, use it
        return process.env.TMDB_API_V3_KEY;
    } else {
        // Otherwise, get it from the file system
        let credentials = await getCredentialsJSON();
        return credentials["tmdb_api_v3_key"];
    }
}

exports.getLoginInformation = async () => {
    let credentials = await getCredentialsJSON();
    return {
        "username": credentials.username,
        "password": credentials.password
    }
};

exports.getSessionId = async () => {
    return process.env.TMDB_SESSION_ID
        ? process.env.TMDB_SESSION_ID
        : (await getCredentialsJSON()).session_id;
};

/**
 * Gets the credentials JSON from the file system.
 */
getCredentialsJSON = async () => {
    let credentials = await fs.readFile('././credentials.json');
    return JSON.parse(credentials);
}