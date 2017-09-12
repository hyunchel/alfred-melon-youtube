const playlistItems = require('./playlistItems');
const KINDS = {
    list: 'youtube#playlistListResponse',
    insert: 'youtube#playlist',
    update: 'youtube#playlistUpdateResponse',
    delete: 'youtube#playlistDeleteResponse',
};

// FIXME: We are in Monkey's Nest -> internet is slow.
jest.setTimeout(20000);

test('responds List', (done) => {
    const playlistId = '';
    const callback = (err, resp) => {
        if (err) {
            console.error(err);
            expect(err.code).toBe(404);
            // expect(true).toBeFalsy();
            return done();
        }
        expect(resp.kind).toBe(KINDS.list);
        // done();
    }
    playlistItems.listPlaylistItems(playlistId, callback);
});

test('responds Insert', (done) => {
    const title = 'big';
    const description = 'boy';
    const callback = (err, resp) => {
        if (err) {
            console.error(err);
            expect(true).toBeFalsy();
            return done();
        }
        expect(resp.kind).toBe(KINDS.insert);
        done();
    }
    playlistItems.insertPlaylistItems(title, description, callback);
});

test('responds Update', (done) => {
    const oldTitle = 'bad';
    const newTitle = 'good';
    const description = 'boy';
    const callback = (err, resp) => {
        if (err) {
            console.error(err);
            expect(err.code).toBe(401);
            return done();
        }
        console.log(resp);
        expect(resp.kind).toBe(KINDS.update);
        done();
    }
    playlistItems.updatePlaylistItems(oldTitle, newTitle, description, callback);
});

test('responds Delete', (done) => {
    const title = 'good';
    const callback = (err, resp) => {
        if (err) {
            console.error(err);
            expect(err.code).toBe(401);
            return done();
        }
        console.log(resp);
        expect(resp.kind).toBe(KINDS.delete);
        done();
    }
    playlistItems.deletePlaylistItems(title, callback);
});