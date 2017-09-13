const alfy = require('alfy');
const {
    getQueries,
    getVideoIds,
    getPlaylistId,
    insertIntoPlaylist,
    deletePlaylist,
} = require('./helpers');
const { getAuthenticated } = require('./auth');


const createAction = (date, cutLine) => {
    getAuthenticated(alfy.config)
        .then(getQueries)
        .then(getVideoIds)
        .then(getPlaylistId)
        .then(insertIntoPlaylist)
        .catch(err => console.error(err));
};

const deleteAction = (date, cutLine) => {
    getAuthenticated(alfy.config)
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