const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base/base.data');

const item = 1;
let ModelClass = null;
const db = {
    collection: () => { },
};
const validator = {
    isValid: () => { },
};
let data = null;

describe('isModelValid', () => {
    beforeEach(() => {
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return () => {};
            });
        sinon.stub(validator, 'isValid')
            .callsFake((item) => {
                return Promise.resolve(item);
            });
        ModelClass = class {
        };
        data = new BaseData(db, ModelClass, validator);
    });
    afterEach(() => {
        db.collection.restore();
        validator.isValid.restore();
    });
    it('should call validator.Isvalid', () => {
        const expectedResult = item;
        return data._isModelValid(item)
            .then((result) => {
                expect(result).to.equal(expectedResult);
            });
    });
});
