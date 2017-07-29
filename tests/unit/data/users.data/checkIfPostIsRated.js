const { expect } = require('chai');
const sinon = require('sinon');
const { ObjectId } = require('mongodb');


const BaseData = require('../../../../data/users.data');

const db = {
    collection: () => { },
};

let ModelClass = null;
const validator = null;
let data = null;
let liked = null;

const update = (item1, item2) => {
    return Promise.resolve(item1._id);
};

describe('checkIfPostIsRated', () => {
    it('should return false if not rated', () => {
        liked = {
            indexOf: () => {
                return -1;
            },
        }
        ModelClass = class {
        };
        data = new BaseData(db, ModelClass, validator);
        return data.checkIfPostIsRated(liked, 5)
            .then((result) => {
                expect(result).to.be.false;
            });
    });
    it('should return true if rated', () => {
        liked = {
            indexOf: () => {
                return 1;
            },
        }
        ModelClass = class {
        };
        data = new BaseData(db, ModelClass, validator);
        return data.checkIfPostIsRated(liked, 5)
            .then((result) => {
                expect(result).to.be.true;
            });
    });
});
