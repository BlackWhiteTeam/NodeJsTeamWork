const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('renderLoginPage', () => {
    const data = {

    };
    let controller = null;
    const helpers = {

    };

    let req = null;
    let res = null;

    beforeEach(() => {
        controller = userController(data, helpers);
        res = require('../req.res').getResponseMock();
    });

    it('expect to render login page if not logged in', () => {
        req = require('../req.res').getRequestMock();
        controller.renderLoginPage(req, res);
        return expect(res.viewName).to.be.equal('users/login');
    });
    it('expect to render user + id', () => {
        req = require('../req.res').getRequestMock({ user: { _id: 5 } });
        controller.renderLoginPage(req, res);
        return expect(res.redirectUrl).to.be.equal('/users/' + '5');
    });
});
