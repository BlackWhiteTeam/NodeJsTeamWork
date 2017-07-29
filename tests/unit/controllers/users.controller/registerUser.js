const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('registerUser', () => {
    let data = null;
    let controller = null;
    const helpers = {
    };
    const expectedResult = 'testUser';
    let returnedResult;
    let req = null;
    let res = null;

    beforeEach(() => {
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
        res = require('../req.res').getResponseMock();
    });

    it('when users are valid should return user', () => {
        return controller.registerUser(req, res)
            .then(() => {
               return expect(returnedResult).to.be.equal(expectedResult);
            });
    });
});