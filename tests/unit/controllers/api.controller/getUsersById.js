const { expect } = require('chai');

const apiController =
    require('../../../../app/controllers/api.controller');

describe('getUsersById', () => {
    let data = null;
    let controller = null;
    const helpers = {
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });
    it('should return correct user', () => {
        data = {
            users: {
                getById: (id) => {
                    return Promise.resolve(id);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            params: {
                id: 2,
            },
        });
        controller = apiController(data, helpers);
        return controller.getUserById(req, res)
            .then(() => {
                return expect(res.body).to.equal(2);
            });
    });
});