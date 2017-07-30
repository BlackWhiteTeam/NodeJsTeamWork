const request = require('supertest');
const superAgent = require('./superAgent.js')();

describe('/items tests', () => {
    const connectionString = 'mongodb://localhost/mydb';
    let app = null;
    let agent = null;

    beforeEach((done) => {
        console.log(superAgent.login);
        superAgent.login(request, (loginAgent) => {
            agent = loginAgent;
            done();
        });
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => require('../../sockets').init(_app))
            .then((http) => {
                app = http;
            });
    });
    // describe('GET /gallery', () => {
    //     it('expect to return 200', (done) => {
    //         request(app)
    //             .get('/gallery')
    //             .expect(200)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return done(err);
    //                 }
    //                 return done();
    //             });
    //     });
    // });
    describe('GET /myphotos', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/myphotos')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    // describe('GET /createPost', () => {
    //     it('expect to return 302', (done) => {
    //         request(app)
    //             .get('/createPost')
    //             .expect(302)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return done(err);
    //                 }
    //                 return done();
    //             });
    //     });
    // });
    // describe('GET /myfavorites', () => {
    //     it('expect to return 200', (done) => {
    //         request(app)
    //             .get('/myfavorites')
    //             .expect(200)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return done(err);
    //                 }
    //                 return done();
    //             });
    //     });
    // });
});

// function loginUser(app) {
//     return function(done) {
//         request(app)
//             .post('/login')
//             .send({ username: 'asd', password: 'asd'})
//             .expect(302)
//             .end(onResponse);

//         function onResponse(err, res) {
//            if (err) return done(err);
//            return done();
//         }
//     };
// };