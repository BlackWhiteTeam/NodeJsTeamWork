class Post {
    static isValid(model) {
        // validate
        return typeof model !== 'undefined';
    }
}

module.exports = Post;
