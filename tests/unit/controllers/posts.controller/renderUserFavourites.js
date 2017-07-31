const { expect } = require('chai');

const postsController =
    require('../../../../app/controllers/posts.controller');

describe('renderUserFavourites', () => {
    let data = null;
    let controller = null;
    const helpers = {
        getLikedAndDisliked: (posts, req) => {
            return posts;
        },
        getFavourites: (posts, req) => {
            return Promise.resolve(posts);
        },
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
                favourites: [1, 2, 3, 4],
            },
        });
        controller = postsController(data, helpers);
        controller.renderUserFavourites(req, res);
        expect(res.viewName).to.equal('posts/gallery');
        return expect(res.context.context).to.deep
            .equal([4, 3, 2, 1]);
    });
});
