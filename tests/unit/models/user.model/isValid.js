const { expect } = require('chai');

const model = require('../../../../models/user.model');

const testModel = {
    name: 'somename',
    password: 'somepassword',
    email: 'testema@abv.bg',
    stringProfilePicture: 'somepicture.png',
};
describe('user.model', () => {
    it('should return true when model is valid', () => {
       return expect(model.isValid(testModel)).to.be.true;
    });
    it('should return false when undefined is passed', () => {
        testModel.name = undefined;
       return expect(model.isValid(testModel)).to.be.false;
    });
});
