/* eslint-disable new-cap */
const ObjectId = require('mongodb').ObjectID;
const BaseData = require('./base/base.data');
const Post = require('../models/post.model');

class PostsData extends BaseData {
    constructor(db) {
        super(db, Post, Post);
    }

    getPostsByUsername(username) {
        return this.collection.find(
            { 'author.name': username }
        ).toArray();
    }

    getMyFavoritesPosts(favorites) {
        return this.collection.find({
            _id: { $in: favorites },
        }).toArray();
    }

    like(postId) {
        return this.collection.update({ _id: ObjectId(postId) },
            {
                $inc: { likes: 1 },
            });
    }

    unlike(postId) {
        return this.collection.update(
            { _id: ObjectId(postId), likes: { $gt: 0 } },
            {
                $inc: { likes: -1 },
            });
    }

    dislike(postId) {
        return this.collection.update({ _id: ObjectId(postId) },
            {
                $inc: { dislikes: 1 },
            });
    }

    undislike(postId) {
        return this.collection.update(
            { _id: ObjectId(postId), dislikes: { $gt: 0 } },
            {
                $inc: { dislikes: -1 },
            });
    }
}

module.exports = PostsData;
