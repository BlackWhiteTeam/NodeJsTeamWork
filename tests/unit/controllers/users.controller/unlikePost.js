const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('unlikePost', () => {
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
                checkIfPostIsRated: (user, post) => {
                    return Promise.resolve(user, post);
                },
                deleteFromLiked: (user, postId) => {
                    return Promise.resolve();
                },
            },
            posts: {
                unlike: (postId) => {
                    return Promise.resolve();
                },
                getById: (id) => {
                    return Promise.resolve(id);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
                liked: true,
                _id: {},
            },
            body: {
                postId: {
                },
            },
        });
        controller = userController(data, helpers);
        return controller.unlikePost(req, res)
            .then(() => {
                return expect(res.body).to.deep.equal({});
            });
    });

    it('should redirect to login if not logged in', () => {
        data = {};
        req = require('../req.res').getRequestMock({});
        controller = userController(data, helpers);
        controller.unlikePost(req, res);
        return expect(res.redirectUrl).to.be.equal('/login');
    });
    it('should reject if already liked', () => {
         data = {
            users: {
                checkIfPostIsRated: (isliked, post) => {
                    return Promise.resolve(isliked, post);
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
                liked: false,
            },
            body: {
                postId: {
                },
            },
        });
        controller = userController(data, helpers);
        return controller.unlikePost(req, res)
            .then(() => {
                expect(res.statusCode).to.be.equal(400);
                return expect(res.body).to.be.equal('You already unliked this picture!');
            });
    });
});