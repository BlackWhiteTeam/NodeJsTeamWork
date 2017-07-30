const { expect } = require('chai');

const getControllers =
    require('../../../../app/controllers/controllers');

describe('getControllers', () => {
    const data = {
    };
    const helpers = {
    };
    it('should return correct controllers', () => {
        const result = getControllers(data, helpers);
        expect(result).to.include.keys('apiController',
            'homeController',
            'postsController',
            'usersController');
    });
});
