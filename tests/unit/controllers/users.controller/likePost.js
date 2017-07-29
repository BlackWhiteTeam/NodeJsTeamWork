const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('likePost', () => {
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
                checkIfPostIsRated: (user, postId) => {
                    return Promise.resolve(false);
                },
                addToLiked: (user, postId) => {
                    return Promise.resolve();
                },
            },
            posts: {
                like: (postId) => {
                    return Promise.resolve();
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
            },
            body: {
                postId: {
                },
            },
        });
        controller = userController(data, helpers);
        return controller.likePost(req, res)
            .then(() => {
                return expect(res.body).to.deep.equal({});
            });
    });

    it('should redirect to login if not logged in', () => {
        data = {};
        req = require('../req.res').getRequestMock({});
        controller = userController(data, helpers);
        controller.likePost(req, res);
        return expect(res.redirectUrl).to.be.equal('/login');
    });
    it('should reject if already liked', () => {
        data = {
            users: {
                checkIfPostIsRated: (user, postId) => {
                    return Promise.resolve(true);
                },
                addToLiked: (user, postId) => {
                },
            },
            posts: {
                like: (postId) => {
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
            },
            body: {
                postId: {
                },
            },
        });
        controller = userController(data, helpers);
        return controller.likePost(req, res)
            .then(() => {
                expect(res.statusCode).to.be.equal(400);
                return expect(res.body).to.be.equal('You already liked this picture!');
            });
    });
});