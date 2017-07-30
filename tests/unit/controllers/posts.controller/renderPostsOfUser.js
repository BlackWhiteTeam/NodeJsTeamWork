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
    });
    it('should return correct post', () => {
        data = {
            posts: {
                getPostsByUsername: (user) => {
                    return Promise.resolve(user);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
                name: [1, 2, 3],
            },
        });
        controller = postsController(data, helpers);
        return controller.renderPostsOfUser(req, res)
            .then(() => {
                 expect(res.viewName).to.equal('posts/gallery');
                 return expect(res.context).to.deep.equal({ context: [3, 2, 1] });
            });
    });
});
