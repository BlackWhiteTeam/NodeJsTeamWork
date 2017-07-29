const { expect } = require('chai');

const postsController =
    require('../../../../app/controllers/posts.controller');

describe('showPicture', () => {
    let data = null;
    let controller = null;
    const helpers = {
        uploadPicture: () => {
            return {
                filename: {},
            };
        },
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });
    it('should return correct post', () => {
        req = require('../req.res').getRequestMock({
            file: {},
        });
        controller = postsController(data, helpers);
        controller.showPicture(req, res);
        return expect(res.redirectUrl).to.equal('/createPost');
    });
});