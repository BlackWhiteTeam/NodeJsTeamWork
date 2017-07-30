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
        res.locals = {
                loggedIn: {},
                user: {},
            };
        const next = () => {
            return 4;
        };
        controller = homeController();
        expect(controller.setLocals(req, res, next)).to.be.equal(4);
    });
});
