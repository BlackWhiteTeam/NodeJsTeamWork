const { expect } = require('chai');
const sinon = require('sinon');
const { ObjectId } = require('mongodb');


const BaseData = require('../../../../data/users.data');

const db = {
    collection: () => { },
};
const idUser = 1;
const idPost = 1;

let ModelClass = null;
const validator = null;
let data = null;

const update = (item1, item2) => {
    return Promise.resolve(item1._id);
};

describe('updateProiflePicture', () => {
    beforeEach(() => {
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return {
                    update,
                };
            });
        ModelClass = class {
        };
        data = new BaseData(db, ModelClass, validator);
    });
    afterEach(() => {
        db.collection.restore();
    });
    it('update should be called with right id', () => {
        return data.updateProfilePicture(idUser, idPost)
            .then((result) => {
                expect(result[0]).to.equal(ObjectId(idUser)[0]);
                expect(result[1]).to.equal(ObjectId(idUser)[1]);
                expect(result[2]).to.equal(ObjectId(idUser)[2]);
            });
    });
});
