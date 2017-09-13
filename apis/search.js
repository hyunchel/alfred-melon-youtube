const { search } = require('./apis');

/**
 * searchVideos
 * Performs a search for videos.
 * @param {string} query A query to search for.
 * @param {function} callback A callback function to run after the search result is fetched.
 */
const searchVideos = (query, callback) => {
    return search.list(query, callback);
};

module.exports = {
    searchVideos,
}