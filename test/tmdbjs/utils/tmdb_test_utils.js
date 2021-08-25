const fs = require('fs').promises;
const Tmdb = require('../../../src/tmdb-js/tmdb-js').TmdbClient;

/**
 * Instantiates a TMDb object with an API key.
 */
exports.getApiReadyTmdbAsync = async function() {
    let apiKey = await exports.getApiKeyAsync();
    return new Tmdb(apiKey);
};

/**
 * Gets the API key from the file system.
 * @returns {Promise<string>} A Promise of an API key as a string.
 */
exports.getApiKeyAsync = async () => {
    if (process.env.TMDB_API_V3_KEY) {
        // If the TMDb API key can be found among the secrets, use it
        return process.env.TMDB_API_V3_KEY;
    } else {
        // Otherwise, get it from the file system
        let credentials = await getCredentialsJsonAsync();
        return credentials["tmdb_api_v3_key"];
    }
}

/**
 * Gets login information.
 * @returns {Promise<{password: string, username: string}>}
 */
exports.getLoginInformationAsync = async () => {
    let credentials = await getCredentialsJsonAsync();
    return {
        "username": credentials.username,
        "password": credentials.password
    };
};

exports.getSessionIdAsync = async () => {
    return process.env.TMDB_SESSION_ID
        ? process.env.TMDB_SESSION_ID
        : (await getCredentialsJsonAsync()).session_id;
};

/**
 * Gets the credentials JSON from the file system.
 */
getCredentialsJsonAsync = async () => {
    let credentials = await fs.readFile('././credentials.json');
    return JSON.parse(credentials.toString());
}