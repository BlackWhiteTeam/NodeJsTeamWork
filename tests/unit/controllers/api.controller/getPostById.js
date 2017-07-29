const { expect } = require('chai');

const apiController =
    require('../../../../app/controllers/api.controller');

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
                getById: (id) => {
                    return Promise.resolve(id);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            params: {
                id: 8,
            },
        });
        controller = apiController(data, helpers);
        return controller.getPostById(req, res)
            .then(() => {
                return expect(res.body).to.equal(8);
            });
    });
});