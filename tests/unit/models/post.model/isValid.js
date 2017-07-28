const { expect } = require('chai');
const sinon = require('sinon');

const model = require('../../../../models/post.model');

describe('post.model', () => {
    it('should return true when model exist', () => {
       return expect(model.isValid('something')).to.be.true;
    });
    it('should return false when undefined is passed', () => {
       return expect(model.isValid(undefined)).to.be.false;
    });
});