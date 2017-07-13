const ObjectId = require('mongodb').ObjectID;

const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    checkPassword(user, password) {
        if (!user) {
            return Promise.reject('Invalid user');
        }
        if (user.password !== password) {
            return Promise.reject('Invalid password');
        }
        return Promise.resolve(user);
    }

    getAllUsersByMatchingString(input) {
        const users = this.collection.find({
                name: new RegExp('^' + input.toString()),
            })
            .toArray();

        return users;
    }

    updateProfilePicture(id, photo) {
        // eslint-disable-next-line
        this.collection.update({_id: ObjectId(id)}, {$set: {stringProfilePicture: photo.filename}});
    }

    _isModelValid(model) {
        return super._isModelValid(model);
    }
}

module.exports = UsersData;
