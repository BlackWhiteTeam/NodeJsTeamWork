const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('searchUser', () => {
    let data = null;
    let controller = null;
    const helpers = {
        uploadPicture: () => { },
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });
    it('should render correctly', () => {
        data = {
            users: {
                getAllUsersByMatchingString: (input) => {
                    return Promise.resolve(input);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
            },
            body: {
                searchedUser: {
                },
            },
        });
        controller = userController(data, helpers);
        return controller.searchUser(req, res)
            .then(() => {
                return expect(res.viewName).to.be.equal('users/all');
            });
    });
});
