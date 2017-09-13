const alfy = require('alfy');
const {
    getQueries,
    getVideoIds,
    getPlaylistId,
    insertIntoPlaylist,
    deletePlaylist,
} = require('./helpers');


const createAction = (date, cutLine) => {
    getQueries(date, cutLine)
        .then(getVideoIds)
        .then(getPlaylistId)
        .then(insertIntoPlaylist)
        .catch(err => console.error(err));
};

const deleteAction = (date, cutLine) => {
    getQueries(date, cutLine)
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