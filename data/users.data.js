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
        return this.collection.find({
            name: new RegExp('^' + input.toString(), 'i'),
        }).toArray();
    }

    addToLiked(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $addToSet: { liked: idPost },
            });
    }

    deleteFromLiked(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $pull: { liked: idPost },
            });
    }
    addToDisliked(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $addToSet: { disliked: idPost },
            });
    }

    deleteFromDisliked(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $pull: { disliked: idPost },
            });
    }

    addToFavorites(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $addToSet: { favorites: idPost },
            });
    }

    deleteFromFavorites(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $pull: { favorites: { $in: [idPost] } },
            });
    }

    updateProfilePicture(id, photo) {
        return this.collection.update({ _id: ObjectId(id) },
            {
                $set: { stringProfilePicture: photo.filename },
            });
    }

    checkIfPostIsLiked(liked, postId) {
        console.log(liked);
        console.log(postId);
        const index = liked.indexOf(postId);
        console.log(index);
        if (index !== -1) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}

module.exports = UsersData;
