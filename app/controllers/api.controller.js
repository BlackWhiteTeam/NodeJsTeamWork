const apiController = (data, helpers) => {
    return {
        getUsers(req, res) {
            let searchedUser = '';
            if (req.url.indexOf('=') !== -1) {
                const searchedUrl = req.url.split('=');
                searchedUser = searchedUrl[searchedUrl.length - 1];
            }
            return data.users.getAllUsersByMatchingString(searchedUser)
                .then((users) => {
                    return res.send(users);
                });
        },
        getUserById(req, res) {
            const id = req.params.id;
            return data.users.getById(id)
                .then((user) => {
                    return res.send(user);
                });
        },
        getUserPosts(req, res) {
            const id = req.params.id;
            return data.users.getById(id)
                .then((user) => {
                    return data.posts.getPostsByUsername(user.name)
                        .then((posts) => {
                            return res.send(posts);
                        });
                });
        },
        getPosts(req, res) {
            return data.posts.getAll()
                .then((posts) => {
                    return res.send(posts);
                });
        },
        getPostById(req, res) {
            const id = req.params.id;
            return data.posts.getById(id)
                .then((post) => {
                    return res.send(post);
                });
        },
    };
};

module.exports = apiController;
