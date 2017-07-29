const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('renderRegisterPage', () => {
    let data = {
        
    };
    let controller = null;
    const helpers = {

    };
    const users = [1, 2, 3, 4];

    let req = null;
    let res = null;

    beforeEach(() => {
        controller = userController(data, helpers);
        req = require('../req.res').getRequestMock();
        res = require('../req.res').getResponseMock();
    });

    it('expect to return correct response', () => {
        controller.renderRegisterPage(req, res);
        return expect(res.viewName).to.be.equal('users/register');
    });
});