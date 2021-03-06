const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../../data/users.data');
const db = {
    collection: () => { },
};
let items = [];

let ModelClass = null;
let validator = null;
let data = null;

const insert = (something) => {
    return Promise.resolve(something);
};
describe('create(model)', () => {
    beforeEach(() => {
        items = [1, 2, 3, 4];
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { insert };
            });
        ModelClass = class {
        };
        ModelClass.toViewModel = (providedModel) => {
            return providedModel;
        };
        validator = {
            isValid: () => { },
        };
        // Arrange
        data = new BaseData(db, ModelClass, validator);
    });
    afterEach(() => {
        db.collection.restore();
        data.validator.isValid.restore();
    });

    it('expect to reject when invalid', () => {
        sinon.stub(data.validator, 'isValid')
            .callsFake(() => {
                return false;
            });
        return data.create(items)
            .then(() => {
                expect(false).to.be.true;
            },
            () => {
                expect(true).to.be.true;
            });
    });
    it('expect to add correctly when valid', () => {
         const expectedResult = {
             0: 1,
             1: 2,
             2: 3,
             3: 4,
         };
         data.collection.findOne = () => {
             return Promise.resolve(null);
         };
         sinon.stub(data.validator, 'isValid')
             .callsFake(() => {
                 return true;
             });
         return data.create(items)
             .then((result) => {
                 expect(result).to.contain(expectedResult);
             });
     });
});
