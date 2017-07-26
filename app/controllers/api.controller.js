// put in helper
const getIdByUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
};

const apiController = (data, helpers) => {
    return {
        getUsers(req, res) {
            let searchedUser = '';
            if (req.url.indexOf('=') !== -1) {
                const searchedUrl = req.url.split('=');
                searchedUser = searchedUrl[searchedUrl.length - 1];
            }
            data.users.getAllUsersByMatchingString(searchedUser)
                .then((users) => {
                    return res.send(users);
                });
        },
        getUserById(req, res) {
            const id = getIdByUrl(req.url);
            data.users.getById(id)
                .then((user) => {
                    return res.send(user);
                });
        },
        getUserPosts(req, res) {
            const id = getIdByUrl(req.url.slice(0, -6));
            data.users.getById(id)
                .then((user) => {
                    data.posts.getPostsByUsername(user.name)
                        .then((posts) => {
                            res.send(posts);
                        });
                });
        },
        getPosts(req, res) {
            data.posts.getAll()
                .then((posts) => {
                    return res.send(posts);
                });
        },
        getPostById(req, res) {
            const id = getIdByUrl(req.url);
            data.posts.getById(id)
                .then((post) => {
                    return res.send(post);
                });
        },
    };
};

module.exports = apiController;
