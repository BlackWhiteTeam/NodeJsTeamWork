const { expect } = require('chai');

const postsController =
    require('../../../../app/controllers/posts.controller');

describe('getPostById', () => {
    let data = null;
    let controller = null;
    const helpers = {
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
        req = require('../req.res').getRequestMock();
    });
    it('should return correct post', () => {
        data = {
            posts: {
                getAll: () => {
                    return Promise.resolve([1, 2]);
                },
            },
        };
        controller = postsController(data, helpers);
        return controller.renderAllPosts(req, res)
            .then(() => {
                 expect(res.viewName).to.equal('posts/gallery');
                 return expect (res.context).to.deep.equal({ context: [2, 1] });
            });
    });
});