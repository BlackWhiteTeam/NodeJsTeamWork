const { expect } = require('chai');
const sinon = require('sinon');

const db = {
    collection: () => { },
};
let data = null;
describe('index should init data', () => {
    it('init should work properly', () => {
        return expect(data = require('../../../../data').init(db)).not.to.throw;
    });
});
