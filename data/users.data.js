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
                $addToSet: { liked: ObjectId(idPost) },
            });
    }

    deleteFromLiked(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $pull: { liked: ObjectId(idPost) },
            });
    }
    addToDisliked(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $addToSet: { disliked: ObjectId(idPost) },
            });
    }

    deleteFromDisliked(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $pull: { disliked: ObjectId(idPost) },
            });
    }

    addToFavorites(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $addToSet: { favorites: ObjectId(idPost) },
            });
    }

    deleteFromFavorites(idUser, idPost) {
        return this.collection.update({ _id: ObjectId(idUser) },
            {
                $pull: { favorites: { $in: [ObjectId(idPost)] } },
            });
    }

    updateProfilePicture(id, photo) {
        return this.collection.update({ _id: ObjectId(id) },
            {
                $set: { stringProfilePicture: photo.filename },
            });
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
}

module.exports = UsersData;
