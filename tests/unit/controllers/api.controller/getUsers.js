const { expect } = require('chai');

const apiController =
    require('../../../../app/controllers/api.controller');

describe('getUsers', () => {
    let data = null;
    let controller = null;
    const helpers = {
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });
    it('when index is valid should send correct data', () => {
        data = {
            users: {
                getAllUsersByMatchingString: (user) => {
                    return Promise.resolve(user);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            url: {
                indexOf: () => {
                    return 1;
                },
                split: () => {
                    return [1];
                },
            },
            body: {
                postId: {
                },
            },
        });
        controller = apiController(data, helpers);
        return controller.getUsers(req, res)
            .then((result) => {
                return expect(res.body).to.equal(1);
            });
    });
    it('when index is invalid should send empty string', () => {
        data = {
            users: {
                getAllUsersByMatchingString: (user) => {
                    return Promise.resolve(user);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            url: {
                indexOf: () => {
                    return -1;
                },
            },
            body: {
                postId: {
                },
            },
        });
        controller = apiController(data, helpers);
        return controller.getUsers(req, res)
            .then((result) => {
                return expect(res.body).to.equal('');
            });
    });
});
