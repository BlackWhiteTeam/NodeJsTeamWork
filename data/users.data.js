const { ObjectId } = require('mongodb');
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
            name: new RegExp('^' + input.toString(), 'i'),
        }).toArray();
        return users;
    }

    addToFavourites(idUser, idPost) {
        // eslint-disable-next-line
       return this.collection.update({_id: ObjectId(idUser)}, {$addToSet: {favorites: ObjectId(idPost)}});
    }

    deleteFromFavourites(idUser, idPost) {
        return this.collection.update(
            // eslint-disable-next-line
            {_id: ObjectId(idUser)}, {$pull: {favorites: {$in: [ObjectId(idPost)]}}});
    }

    updateProfilePicture(id, photo) {
        // eslint-disable-next-line
        return this.collection.update({_id: ObjectId(id)}, {$set: {stringProfilePicture: photo.filename}});
    }
}

module.exports = UsersData;
