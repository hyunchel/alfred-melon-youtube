const Melon = require('melon-chart-api');
const { searchVideos } = require('./apis/search');
const { listPlaylists } = require('./apis/playlists');
const { insertPlaylistItems } = require('./apis/playlistItems');

/**
 * getQueries
 * Fetches music chart data from Melon. 
 * @param {string} date String representation of a date.
 * @param {number} cutLine Number of ranks to receieve.
 */
const getQueries = (date, cutLine) => {
    return Melon(date, { cutLine }).weekly().then(chart => {
        // console.log(chart.data.map(d => `${d.title} ${d.artist} -> ${d.rank}`));
        return chart.data.map(d => `${d.title} ${d.artist}`);
    });
};

/**
 * getVideoIds
 * Requests Youtube search on queries.
 * @param {array} queries An array of items that contains "query" to search for.
 */
const getVideoIds = (queries) => {
    // const cb = (err, resp) => resp.items[0].id.videoId;
    const cb = (err, resp) => {
        const title = resp.items[0].snippet.title;
        // console.log(`${title} -> ${resp.items[0].id.videoId}`);
        return resp.items[0].id.videoId;
    };
    return Promise.all(queries.map(query => searchVideos(query, cb)));
};

/**
 * getPlaylistId
 * Finds a playlist ID and passes it along with data object.
 * @param {object} data Any object that contains data to pass on.
 */
const getPlaylistId = (data) => {
    return listPlaylists((err, resp) => {
        const playlistIds = (resp.items.map(item => item.id));
        return playlistIds[0];
    }).then(playlistId => {
        return {
            playlistId,
            data,
        };
    });
};

/**
 * insertIntoPlaylist
 * Adds videos into the playlist.
 * @param {object} data An object that contains playlist ID and an array of video IDs.
 */
const insertIntoPlaylist = (data) => {
    const playlistId = data.playlistId;
    const videoIds = data.data;
    // const cb = () => console.log(`${videoId} is added to ${playlistId}.`);
    return videoIds.map((videoId, index) => {
        // FIXME: Set "snippet.position" to ensure order. Need to change functions to take a hash params.
        // Limit 2 API calls per second.
        setTimeout(() => {
            return insertPlaylistItems(playlistId, videoId, () => console.log(`${videoId} is added to ${playlistId}.`))
        }, 500 * index);
    });
};

module.exports = {
    getQueries,
    getVideoIds,
    getPlaylistId,
    insertIntoPlaylist,
}