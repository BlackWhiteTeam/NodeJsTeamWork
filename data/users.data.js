/* eslint-disable new-cap */
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
            return Promise.reject('Invalid user');
        }
        return this.collection.findOne({
            name: user.name,
        }).then((userExists) => {
            if (userExists) {
                return Promise.reject('Username already taken!');
            }
            user.password = CryptoJS.SHA1(user.password).toString();
            return this.collection.insert(user);
        }).then(() => {
            return this.ModelClass.toViewModel(user);
        });
    }

    checkPassword(user, password) {
        if (!user) {
            return Promise.reject('Invalid user');
        }

        if (user.password !== CryptoJS.SHA1(password).toString()) {
            return Promise.reject('Invalid password');
        }
        return Promise.resolve(user);
    }

    getAllUsersByMatchingString(input) {
        return this.collection.find({
            name: new RegExp('^' + input.toString(), 'i'),
        }).toArray();
    }

    addToLiked(idUser, post) {
        return this.collection.update({_id: ObjectId(idUser)},
            {
                $addToSet: {liked: post},
            });
    }

    deleteFromLiked(idUser, post) {
        return this.collection.update({_id: ObjectId(idUser)},
            {
                $pull: {liked: {_id: ObjectId(post._id)}},
            });
    }

    addToDisliked(idUser, post) {
        return this.collection.update({_id: ObjectId(idUser)},
            {
                $addToSet: {disliked: post},
            });
    }

    deleteFromDisliked(idUser, post) {
        return this.collection.update({_id: ObjectId(idUser)},
            {
                $pull: {disliked: {_id: ObjectId(post._id)}},
            });
    }

    addToFavorites(idUser, post) {
        return this.collection.update({_id: ObjectId(idUser)},
            {
                $addToSet: {favorites: post},
            });
    }

    deleteFromFavorites(idUser, post) {
        return this.collection.update({_id: ObjectId(idUser)},
            {
                $pull: {favorites: {$in: [post]}},
            });
    }

    updateProfilePicture(id, photo) {
        return this.collection.update({_id: ObjectId(id)},
            {
                $set: {stringProfilePicture: photo.filename},
            });
    }

    checkIfPostIsRated(liked, post) {
        const index = liked.findIndex(
            (p) => p._id.toString() === post._id.toString()
        );
        if (index !== -1) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}

module.exports = UsersData;
