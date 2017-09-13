const Melon = require('melon-chart-api');
const { searchVideos } = require('./apis/search');
const { listPlaylists, insertPlaylists } = require('./apis/playlists');
const { insertPlaylistItems } = require('./apis/playlistItems');

/**
 * getQueries
 * Fetches music chart data from Melon. 
 * @param {string} date String representation of a date.
 * @param {number} cutLine Number of ranks to receieve.
 */
const getQueries = (date, cutLine) => {
    return Melon(date, { cutLine }).weekly().then(chart => {
        const queries = chart.data.map(d => `${d.title} ${d.artist}`);
        return {
            dates: chart.dates,
            cutLine,
            queries,
        };
    });
};

/**
 * getVideoIds
 * Requests Youtube search on queries.
 * @param {array} queries An array of items that contains "query" to search for.
 */
const getVideoIds = (data) => {
    const cb = (err, resp) => {
        const title = resp.items[0].snippet.title;
        return resp.items[0].id.videoId;
    };
    return Promise.all(data.queries.map(query => searchVideos(query, cb)))
        .then(videoIds => {
            return {
                dates: data.dates,
                cutLine: data.cutLine,
                videoIds,
            };
        });
};

/**
 * getPlaylistId
 * Finds a playlist ID and passes it along with data object.
 * @param {object} data Any object that contains data to pass on.
 */
const getPlaylistId = (data) => {
    const title = `Melon Chart Week of ${data.dates.start} - Top ${data.cutLine}`;
    const description = `Top ${data.cutLine} of Weekly Melon Music Chart ${data.dates.start} - ${data.dates.end}`;
    return findPlaylist(title)
        .then(playlistId => {
            if (playlistId) {
                // Do nothing, just return the ID.
                return playlistId;
            }
            // Make a new playlist with title.
            return createPlaylist(title, description);
        })
        .then(playlistId => {
            return {
                playlistId,
                videoIds: data.videoIds,
            };
        });
};

/**
 * findPlaylist
 * Searches for a playlist and returns its playlist ID.
 * NOTE: returns "undefined" is not found.
 * @param {string} title A title of playlist to search for.
 */
const findPlaylist = (title) => {
    return listPlaylists((err, resp) => {
        const items = resp.items.filter(p => p.snippet.title == title);
        if (items.length) {
            // Return the existing playlist ID.
            // Or should we do nothing and just return?
            return items[0].id
        }
        return undefined;
    });
};

/**
 * createPlaylist
 * Creates a new playlist and returns its playlist ID.
 * @param {string} title A title for new playlist.
 * @param {string} description A description for new playlist.
 */
const createPlaylist = (title, description) => {
    const callback = (err, resp) => resp;
    return insertPlaylists(title, description, callback)
        .then(resource => resource.id);
};

/**
 * insertIntoPlaylist
 * Adds videos into the playlist.
 * @param {object} data An object that contains playlist ID and an array of video IDs.
 */
const insertIntoPlaylist = (data) => {
    const playlistId = data.playlistId;
    const videoIds = data.videoIds;
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