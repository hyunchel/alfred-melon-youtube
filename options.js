const alfy = require('alfy');
const { url, getAccessTokenPromise } = require('./auth');

/**
 * List of possible options for Alfred toggle.
 */
const OPTIONS = {
    getCode: {
        title: 'Get code from Google!',
        subtitle: 'Open a browser to see the code from Google. Make sure you copy the code!',
        arg: url,
    },
    authentication: {
        success: {
            title: 'Authenticated successfully.',
            subtitle: 'Enjoy adding Youtube playlist with "melyou" command.',
        },
        failure(err) {
            return {
                title: 'Authentication failed.',
                subtitle: 'Please retry with new Google code.',
                text: {
                    copy: err.message,
                    largetype: err.message,
                },
            };
        },
        unknown(inputString) {
            return {
                title: 'Authentication failed.',
                subtitle: `Unknown input "${inputString}".`,
            };
        },
    }
};

/**
 * authenticateThenMakeOptions
 * Attempts to authenticate, then creates an option that corresponds to its result.
 * @param {string} inputString A string from Alfred input.
 * @param {Object} store An object that contains "config" from Alfy.
 */
const authenticateThenMakeOptions = (inputString, store) => {
    return new Promise((resolve, reject) => {
        if (inputString.startsWith('4/')) {
            getAccessTokenPromise(store, inputString)
                .then(() => resolve(OPTIONS.authentication.success))
                .catch(err => resolve(OPTIONS.authentication.failure(err)));
        } else {
            resolve(OPTIONS.authentication.unknown(inputString));
        };
    });
};

/**
 * makeOptions
 * Creates options to display in Alfred toggle.
 * @param {string} inputString A string from Alfred input.
 * @param {Object} store An object that contains "config" from Alfy.
 */
const makeOptions = (inputString, store) => {
    const items = [];
    return new Promise((resolve, reject) => {
        if (alfy.input) {
            authenticateThenMakeOptions(inputString, store)
                .then(item => {
                    items.push(item);
                    resolve(items);
                })
                .catch(err => reject(err));
        } else {
            items.push(OPTIONS.getCode);
            resolve(items);
        };
    });
};

makeOptions(alfy.input, alfy.config)
    .then(items => alfy.output(items))
    .catch(err => console.error(err));