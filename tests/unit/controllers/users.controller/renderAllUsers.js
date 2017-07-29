const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('renderAllUsers', () => {
    let data = null;
    let controller = null;
    const helpers = {

    };
    const users = [1, 2, 3, 4];

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            users: {
                getAll() {
                    return Promise.resolve(users);
                },
            },
        };

        controller = userController(data, helpers);
        req = require('../req.res').getRequestMock();
        res = require('../req.res').getResponseMock();
    });

    it('expect get all to return users', () => {
        return controller.renderAllUsers(req, res)  
            .then(() => {
                expect(res.context).to.be.deep.equal({
                    context: users,
                });
                expect(res.viewName).to.be.equal('users/all');
            });
    });
});