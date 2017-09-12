const google = require('googleapis');
const youtube = google.youtube('v3');
const { oauth2Client, authenticate } = require('./auth');

authenticate();

const doSearch = (query, callback) => {
    /**
     * FIXME: Must add the following options near future:
     * topicId (for music)
     * publishedAfter
     * order
     * regionCode 
     * location
     */
    const requestOptions = {
        auth: oauth2Client,
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,
    };
    youtube.search.list(requestOptions, callback);
};

/**
 * searchVideos
 * Performs a search for videos.
 * @param {string} query A query to search for.
 * @param {function} callback A callback function to run after the search result is fetched.
 */
const searchVideos = (query, callback) => {
    doSearch(query, callback);
};


const query = 'Jisung Park';
const callback = (err, resp) => {
    if (err) {
        return console.error(err);
    }
    resp.items.map((item) => {
        // console.log(item.id.videoId);
        // console.log(item.snippet.title);
        // console.log(item.snippet.description);
    });
}
searchVideos(query, callback);

module.exports = {
    searchVideos,
}