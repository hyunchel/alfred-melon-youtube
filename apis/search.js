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


// const query = 'Jisung Park';
// const callback = (err, resp) => {
//     if (err) {
//         return console.error(err);
//     }
//     resp.items.map((item) => {
//         // console.log(item.id.videoId);
//         console.log(item.snippet.title);
//         // console.log(item.snippet.description);
//     });
// }
// searchVideos(query, callback);

module.exports = {
    searchVideos,
}