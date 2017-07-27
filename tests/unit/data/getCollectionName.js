const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

const item = 'modelclass';
let ModelClass = null;
const db = {
    collection: () => { },
};
const validator = null;
let data = null;

describe('getCollectionName', () => {
    beforeEach(() => {
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return () => {};
            });
        ModelClass = class {
        };
        data = new BaseData(db, ModelClass, validator);
    });
    afterEach(() => {
        db.collection.restore();
    });
    it('should return correct name', () => {
        const expectedResult = item + 's';
        return expect(data._getCollectionName()).to.equals(expectedResult);
    });
});