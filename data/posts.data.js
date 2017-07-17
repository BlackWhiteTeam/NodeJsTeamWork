const BaseData = require('./base/base.data');
const Post = require('../models/post.model');

class PostsData extends BaseData {
    constructor(db) {
        super(db, Post, Post);
    }

    _isModelValid(model) {
        return super._isModelValid(model);
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
}

module.exports = PostsData;
