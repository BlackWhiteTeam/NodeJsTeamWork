const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('dislikePost', () => {
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
                addToDisliked: (user, postId) => {
                    return Promise.resolve();
                },
            },
            posts: {
                dislike: (postId) => {
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
        return controller.dislikePost(req, res)
            .then(() => {
                return expect(res.body).to.deep.equal({});
            });
    });

    it('should redirect to login if not logged in', () => {
        data = {};
        req = require('../req.res').getRequestMock({});
        controller = userController(data, helpers);
        controller.dislikePost(req, res);
        return expect(res.redirectUrl).to.be.equal('/login');
    });
    it('should reject if already disliked', () => {
        data = {
            users: {
                checkIfPostIsRated: (user, postId) => {
                    return Promise.resolve(true);
                },
                addToDisliked: (user, postId) => {
                },
            },
            posts: {
                dislike: (postId) => {
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
        return controller.dislikePost(req, res)
            .then(() => {
                expect(res.statusCode).to.be.equal(400);
                return expect(res.body).to.be.equal('You already liked this picture!');
            });
    });
});