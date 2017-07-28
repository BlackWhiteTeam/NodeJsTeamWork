const ObjectId = require('mongodb').ObjectID;
const BaseData = require('./base/base.data');
const Post = require('../models/post.model');

class PostsData extends BaseData {
    constructor(db) {
        super(db, Post, Post);
    }
    getPostsByUsername(username) {
        return this.collection.find({
            author: username.toString(),
        }).toArray();
    }

    getMyFavoritesPosts(favorites) {
        return this.collection.find({
            _id: { $in: favorites },
        }).toArray();
    }

    like(postId) {
        // eslint-disable-next-line
       return this.collection.update({_id: ObjectId(postId)}, {$inc: {likes: 1}});
    }

    unlike(postId) {
        // eslint-disable-next-line
       return this.collection.update({_id: ObjectId(postId)}, {$inc: {likes: -1}});
    }

    dislike(postId) {
        // eslint-disable-next-line
       return this.collection.update({_id: ObjectId(postId)}, {$inc: {dislikes: 1}});
    }

    undislike(postId) {
        // eslint-disable-next-line
        return this.collection.update({_id: ObjectId(postId)}, {$inc: {dislikes: -1}});
    }
}

module.exports = PostsData;
