const search= require('./search');
const KINDS = {
    list: 'youtube#searchListResponse',
};

// FIXME: We are in Monkey's Nest -> internet is slow.
jest.setTimeout(20000);

test('responds List', (done) => {
    const query = 'Jisung Park';
    const callback = (err, resp) => {
        if (err) {
            console.error(err);
            expect(true).toBeFalsy();
            return done();
        }
        expect(resp.kind).toBe(KINDS.list);
        done();
    }
    search.searchVideo(query, callback);
});