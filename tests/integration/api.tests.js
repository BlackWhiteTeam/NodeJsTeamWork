const request = require('supertest');

describe('apiRouter', () => {
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
    describe('GET /api/users', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/api/users')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /api/posts', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/api/posts')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
