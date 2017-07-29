const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('userLogout', () => {
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
    it('should redirect to /', () => {
        const expectedMessage = 'You are logged out!';
        let returnedMessage = null;
        data = {
        };
        req = require('../req.res').getRequestMock({
            logout: () => {
            },
            flash: (type, message) => {
                returnedMessage = message;
            },
        });
        controller = userController(data, helpers);
        controller.userLogout(req, res)
        expect(returnedMessage).to.be.equal(expectedMessage);
        return expect(res.redirectUrl).to.be.equal('/');
    });
});