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
    // getAuthenticated(alfy.config)
    //     .then(getQueries)
    //     .then(getVideoIds)
    //     .then(getPlaylistId)
    //     .then(deletePlaylist)
    //     .catch(err => console.error(err));
    getAuthenticated(alfy.config)
        .then((data) => {
            console.log('authenticated!');
            return { date, cutLine };
        })
        .then(getQueries)
        .then((data) => {
            console.log('getQueries is resolved!');
            return data;
        })
        .then(getVideoIds)
        .then(getPlaylistId)
        .then((data) => {
            console.log('all resolved!');
            console.log(data);
            return data;
        })
        .then(deletePlaylist)
        .catch(err => console.error(err));
};

/*
const input = JSON.parse(alfy.input);
if (input.action == 'create') {
    createAction(input.date, input.cutLine);
} else {
    deleteAction(input.date, input.cutLine);
};
*/

console.log(alfy.config.get('tokens'));
// console.log(alfy.config.set('code', 'hohoho'));
// console.log(alfy.config.get('code'));

// alfy.config.delete('code');
// alfy.config.delete('tokens');
deleteAction('20170623', 1);