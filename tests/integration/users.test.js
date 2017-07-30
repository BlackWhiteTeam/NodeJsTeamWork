const request = require('supertest');

describe('usersRouter', () => {
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
    describe('GET /users', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /register', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/register')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('GET /login', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('GET /logout', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/logout')
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
