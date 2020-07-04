const fs = require('fs').promises;

/**
 * Instantiates a TMDB object with an API key.
 */
exports.getApiReadyTmdb = async function() {
    var apiKey = await getApiKey();
    return tmdbjs.tmdb(apiKey);
};

/**
 * Gets the API key from the file system.
 */
exports.getApiKey = async () => {
    if (process.env.TMDB_API_V3_KEY != undefined) {
        // If the TMDB API key can be found among the secrets, use it
        return process.env.TMDB_API_V3_KEY;
    } else {
        // Otherwise, get it from the file system
        var credentials = await getCredentialsJSON();
        return credentials.tmdb_api_v3_key;
    }
}

exports.getLoginInformation = async () => {
    var credentials = await getCredentialsJSON();
    return {
        "username": credentials.username,
        "password": credentials.password
    }
};

/**
 * Gets the credentials JSON from the file system.
 */
getCredentialsJSON = async () => {
    var credentials = await fs.readFile('././credentials.json');
    return JSON.parse(credentials);
}