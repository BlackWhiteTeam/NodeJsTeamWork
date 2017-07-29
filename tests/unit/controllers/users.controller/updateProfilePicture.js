const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('updateProfilePicture', () => {
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

    it('when user is valid should render', () => {
        let user = {
            _id: '5',
        };
        data = {
            users: {
                getByObjectName: () => {
                    return Promise.resolve(user);
                },
                updateProfilePicture: (id, photo) => {
                    return Promise.resolve(id);
                }
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
                name: {},
            },
            params: {
                id: '5',
            },
            file: {
            },
            flash: () => {
            },
        });
        controller = userController(data, helpers);
        return controller.updateProfilePicture(req, res)
            .then(() => {
                return expect(res.redirectUrl).to.be.equal('/users/' + '5');
            });
    });
});