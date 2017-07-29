const { expect } = require('chai');

const homeController =
    require('../../../../app/controllers/home.controller');

describe('renderHome', () => {
    let controller = null;
    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
        req = require('../req.res').getRequestMock();
    });
    it('should render correctly', () => {
        controller = homeController();
        controller.renderHome(req, res);
        return expect(res.viewName).to.equal('home');
    });
});