const { playlists } = require('./apis');

/**
 * listPlaylists
 * Lists all playlists.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const listPlaylists = (callback) => {
    return playlists.list(callback);
};

/**
 * insertPlaylists
 * Creates a new playlist with given name and description.
 * @param {string} title A name of playlist to create.
 * @param {string} description A description for new playlist.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const insertPlaylists = (title, description, callback) => {
    return playlists.insert(title, description, callback);
};

/**
 * updatePlaylists
 * Updates a playlist with given title and description.
 * NOTE: Update is performed on the first playlist that matches the given title. 
 * @param {string} queryTitle A title of playlist to update.
 * @param {string} title New title for the playlist.
 * @param {string} description New description for the playlist.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const updatePlaylists = (playlistId, title, description, callback) => {
    return playlists.update(playlistId, title, description, callback);
};

/**
 * deletePlaylists
 * Request Google Youtube API to delete a playlist with given title. 
 * @param {string} title A title of playlist to delete.
 * @param {function} callback A callback function to run after playlists are fetched.
 */
const deletePlaylists = (playlistId, callback) => {
    return playlists.delete(playlistId, callback);
};

module.exports = {
    listPlaylists,
    insertPlaylists,
    updatePlaylists,    
    deletePlaylists,
}