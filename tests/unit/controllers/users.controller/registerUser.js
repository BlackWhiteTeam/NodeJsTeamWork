const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('registerUser', () => {
    let data = null;
    let controller = null;
    const helpers = {
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });

    it('when users are valid should return user', () => {
        const expectedResult = 'testUser';
        let returnedResult;
        data = {
            users: {
                create: (user) => {
                    return Promise.resolve(user);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            login: (user, err) => {
                returnedResult = user.name;
                return Promise.resolve();
            },
            body: {
                name: 'testUser',
                email: 'testEmail@abv.bg',
                password: 'testPassword',
            },
        });
        controller = userController(data, helpers);
        return controller.registerUser(req, res)
            .then(() => {
                return expect(returnedResult).to.be.equal(expectedResult);
            });
    });
    it('when user is invalid should throw', () => {
        let errormessage = null;
        data = {
            users: {
                create: (user) => {
                    return Promise.reject('testError');
                },
            },
        };
        req = require('../req.res').getRequestMock({
            flash: (type, message) => {
                errormessage = message;
                return;
            },
            body: {
                name: 'testUser',
                email: 'testEmail@abv.bg',
                password: 'testPassword',
            },
        });
        controller = userController(data, helpers);
        return controller.registerUser(req, res)
            .then(() => {
                console.log(errormessage);
                expect(errormessage).to.be.equal('testError');
                return expect(res.redirectUrl).to.be.equal('/register');
            });
    });
});