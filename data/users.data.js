const ObjectId = require('mongodb').ObjectID;
const CryptoJS = require('crypto-js');

const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    create(user) {
        if (!this._isModelValid(user)) {
            return Promise.reject('Invalid model');
        }

        // eslint-disable-next-line new-cap
        user.password = CryptoJS.SHA1(user.password).toString();

        return this.collection.insert(user)
            .then(() => {
                return this.ModelClass.toViewModel(user);
            });
    }

    checkPassword(user, password) {
        if (!user) {
            return Promise.reject('Invalid user');
        }
        // eslint-disable-next-line new-cap
        if (user.password !== CryptoJS.SHA1(password).toString()) {
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

    addToFavorites(idUser, idPost) {
        // eslint-disable-next-line
        this.collection.update({_id: ObjectId(idUser)}, {$addToSet: {favorites: ObjectId(idPost)}});
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
