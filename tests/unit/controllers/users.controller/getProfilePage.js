const { expect } = require('chai');

const userController =
    require('../../../../app/controllers/users.controller');

describe('updateProfilePicture', () => {
    let data = null;
    let controller = null;
    const helpers = {
        getLikedAndDisliked: (posts, req) => {
            return posts;
        },
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });

    it('when user is valid should render', () => {
        data = {
            users: {
                getById: (id) => {
                    return Promise.resolve({
                        name: id,
                    });
                },
            },
            posts: {
                getPostsByUsername: (name) => {
                    return Promise.resolve(name);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
                _id: {
                    toString: () => {

                    },
                },
            },
            params: {
                id: '1',
            },
        });
        controller = userController(data, helpers);
        return controller.getProfilePage(req, res)
            .then(() => {
                expect(res.context.posts).to.be.equal('1');
                return expect(res.viewName).to.be.equal('users/profile');
            });
    });
    it('when invalid used should redirect to login', () => {
        req = require('../req.res').getRequestMock({
            user: false,
        });
        controller = userController(data, helpers);
        controller.getProfilePage(req, res);
        return expect(res.redirectUrl).to.be.equal('/login');
    });
});
