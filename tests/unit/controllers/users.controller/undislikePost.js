const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('undislikePost', () => {
    let data = null;
    let controller = null;
    const helpers = {
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });
    it('should call res.send with empty object', () => {
        data = {
            users: {
                checkIfPostIsRated: (isDisliked, post) => {
                    return Promise.resolve(isDisliked, post);
                },
                deleteFromDisliked: (user, postId) => {
                    return Promise.resolve();
                },
            },
            posts: {
                undislike: (postId) => {
                    return Promise.resolve();
                },
                getById: (id) => {
                    return Promise.resolve(id);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
                disliked: true,
                _id: {},
            },
            body: {
                postId: {
                },
            },
        });
        controller = userController(data, helpers);
        return controller.undislikePost(req, res)
            .then(() => {
                return expect(res.body).to.deep.equal({});
            });
    });

    it('should redirect to login if not logged in', () => {
        data = {};
        req = require('../req.res').getRequestMock({});
        controller = userController(data, helpers);
        controller.undislikePost(req, res);
        return expect(res.redirectUrl).to.be.equal('/login');
    });
    it('should reject if already disliked', () => {
         data = {
            users: {
                checkIfPostIsRated: (isDisliked, post) => {
                    return Promise.resolve(isDisliked, post);
                },
            },
            posts: {
                getById: (id) => {
                    return Promise.resolve(id);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
                disliked: false,
            },
            body: {
                postId: {
                },
            },
        });
        controller = userController(data, helpers);
        return controller.undislikePost(req, res)
            .then(() => {
                expect(res.statusCode).to.be.equal(400);
                return expect(res.body).to.be.equal('You already undisliked this picture!');
            });
    });
});