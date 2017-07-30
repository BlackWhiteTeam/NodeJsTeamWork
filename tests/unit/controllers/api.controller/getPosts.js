const { expect } = require('chai');

const apiController =
    require('../../../../app/controllers/api.controller');

describe('getPosts', () => {
    let data = null;
    let controller = null;
    const helpers = {
    };

    const req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });
    it('should return correct posts', () => {
        data = {
            posts: {
                getAll: () => {
                    return Promise.resolve(9);
                },
            },
        };
        controller = apiController(data, helpers);
        return controller.getPosts(req, res)
            .then(() => {
                return expect(res.body).to.equal(9);
            });
    });
});
