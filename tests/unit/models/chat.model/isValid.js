const { expect } = require('chai');

const model = require('../../../../models/chat.model');

describe('chat.model', () => {
    it('should return true when model exist', () => {
       return expect(model.isValid('something')).to.be.true;
    });
    it('should return false when undefined is passed', () => {
       return expect(model.isValid(undefined)).to.be.false;
    });
});