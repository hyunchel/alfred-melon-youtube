const { playlistItems } = require('./apis');

/**
 * listPlaylistItems
 * Fetches all items listed in the playlist.
 * @param {string} playlistId An ID of a playlist to fetch.
 * @param {function} callback A callback function to run after the playlist is fetched.
 */
const listPlaylistItems = (playlistId, callback) => {
    return playlistItems.list(playlistId, callback);
};

/**
 * insertPlaylistItems
 * Inserts a new item to the playlist. 
 * @param {string} playlistId An ID for a playlist to insert.
 * @param {string} videoId Video ID of a new item for the playlist.
 * @param {function} callback A callback function to run after the item is inserted.
 */
const insertPlaylistItems = (playlistId, videoId, callback) => {
    return playlistItems.insert(playlistId, videoId, callback);
};

/**
 * updatePlaylistItems
 * Modifies a position of an item in the playlist.
 * @param {string} playlistId An ID for a playlist to modify.
 * @param {string} playlistItemId An ID for an item in the specified playlist.
 * @param {string} videoId Video ID of the item in the playlist.
 * @param {string} position An index of the item in the playlist.
 * @param {function} callback A callback function to run after the playlist is updated.
 */
const updatePlaylistItems = (playlistId, playlistItemId, videoId, position, callback) => {
    return playlistItems.update(playlistId, playlistItemId, videoId, position, callback);
};

/**
 * deletePlaylistItems
 * Removes an item from the playlist.
 * @param {string} playlistItemId An ID for an item in the playlist.
 * @param {function} callback A callback function to run after the item is deleted.
 */
const deletePlaylistItems = (playlistItemId, callback) => {
    return playlistItems.delete(playlistItemId, callback);
};

module.exports = {
    listPlaylistItems,
    insertPlaylistItems,
    updatePlaylistItems,
    deletePlaylistItems,
}