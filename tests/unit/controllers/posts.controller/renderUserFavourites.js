const { expect } = require('chai');

const postsController =
    require('../../../../app/controllers/posts.controller');

describe('renderUserFavourites', () => {
    let data = null;
    let controller = null;
    const helpers = {
    };

    let req = null;
    let res = null;

    beforeEach(() => {
        res = require('../req.res').getResponseMock();
    });
    it('should return correct post', () => {
        data = {
            posts: {
                getMyFavoritesPosts: (user) => {
                    return Promise.resolve(user);
                },
            },
        };
        req = require('../req.res').getRequestMock({
            user: {
                favorites: [1, 2, 3, 4],
            },
        });
        controller = postsController(data, helpers);
        return controller.renderUserFavourites(req, res)
            .then(() => {
                expect(res.viewName).to.equal('posts/gallery');
                return expect(res.context.context).to.deep
                    .equal([4, 3, 2, 1]);
            });
    });
});
