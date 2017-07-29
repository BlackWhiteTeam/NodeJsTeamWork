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
        req = require('../req.res').getRequestMock({
            user: {},
        });
        
        controller = postsController(data, helpers);
        controller.renderCreatePost(req, res);
        expect(res.viewName).to.equal('posts/createPost');
        return expect(res.context).to.deep
        .equal({ image: 'upload-icon.png' });
    });
});