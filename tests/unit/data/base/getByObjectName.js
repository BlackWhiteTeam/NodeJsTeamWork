const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/base/base.data');

const db = {
    collection: () => { },
};
const item = 1;

let ModelClass = null;
const validator = null;
let data = null;

const findOne = (object) => {
    return Promise.resolve(object.name);
};

describe('getByObjectName', () => {
    beforeEach(() => {
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return {
                    findOne,
                };
            });
        ModelClass = class {
        };
        data = new BaseData(db, ModelClass, validator);
    });
    afterEach(() => {
        db.collection.restore();
    });
    // Arrange
    it('findOne should be called with correct string', () => {
        const expectedResult = item;
        return data.getByObjectName(item)
            .then((result) => {
                expect(+result).to.equal(expectedResult);
            });
    });
});
