const { expect } = require('chai');

const postsController =
    require('../../../../app/controllers/posts.controller');

describe('createPost', () => {
    let data = null;
    let controller = null;
    const helpers = {
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });
    it('should redirect to myphotos', () => {
        data = {
            posts: {
                create: (post) => {
                    return Promise.resolve(post);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
            },
            body: {
                description: {},
            },
        });
        controller = postsController(data, helpers);
        return controller.createPost(req, res)
            .then(() => {
                return expect(res.redirectUrl).to.equal('/myphotos');
            });
    });
    it('should redirect to / when invalid', () => {
        data = {
            posts: {
                create: (post) => {
                    return Promise.reject(post);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
            },
            body: {
                description: {},
            },
            flash: () => {},
        });
        controller = postsController(data, helpers);
        return controller.createPost(req, res)
            .then(() => {
                return expect(res.redirectUrl).to.equal('/');
            });
    });
});