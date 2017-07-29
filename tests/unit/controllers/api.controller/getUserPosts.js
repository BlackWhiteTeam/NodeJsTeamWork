const { expect } = require('chai');

const apiController =
    require('../../../../app/controllers/api.controller');

describe('getUserPosts', () => {
    let data = null;
    let controller = null;
    const helpers = {
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });
    it('should return correct posts', () => {
        data = {
            users: {
                getById: (id) => {
                    return Promise.resolve({
                        name: id,
                    });
                },
            },
            posts: {
                getPostsByUsername: (id) => {
                    return Promise.resolve(id);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            params: {
                id: 3,
            },
        });
        controller = apiController(data, helpers);
        return controller.getUserPosts(req, res)
            .then(() => {
                return expect(res.body).to.equal(3);
            });
    });
});