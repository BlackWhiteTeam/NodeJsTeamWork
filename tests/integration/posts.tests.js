const request = require('supertest');

describe('postsRouter', () => {
    const connectionString = 'mongodb://localhost/test-db';
    let app = null;
    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => require('../../sockets').init(_app))
            .then((http) => {
                app = http;
            });
    });
    describe('GET /gallery', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/gallery')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /createPost', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/createPost')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
