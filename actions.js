const alfy = require('alfy');
const { refreshAccessTokenPromise } = require('./auth');
const {
    getQueries,
    getVideoIds,
    getPlaylistId,
    insertIntoPlaylist,
    deletePlaylist,
} = require('./helpers');

const createAction = (date, cutLine) => {
    const data = { date, cutLine, store: alfy.config };
    refreshAccessTokenPromise(data)
        .then(getQueries)
        .then(getVideoIds)
        .then(getPlaylistId)
        .then(insertIntoPlaylist)
        .catch(err => console.error(err));
};

const deleteAction = (date, cutLine) => {
    const data = { date, cutLine, store: alfy.config };
    refreshAccessTokenPromise(data)
        .then(getQueries)
        .then(getVideoIds)
        .then(getPlaylistId)
        .then(deletePlaylist)
        .catch(err => console.error(err));
};

const input = JSON.parse(alfy.input);
if (input.action == 'create') {
    createAction(input.date, input.cutLine);
} else {
    deleteAction(input.date, input.cutLine);
};