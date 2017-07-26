// refactor this - function getIdByUrl already exists
const getIdByUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
};

const attachTo = (app, data) => {
    app.get('/api/users', (req, res) => {
        let searchedUser = '';
        if (req.url.indexOf('=') !== -1) {
            const searchedUrl = req.url.split('=');
            searchedUser = searchedUrl[searchedUrl.length - 1];
        }
        data.users.getAllUsersByMatchingString(searchedUser)
            .then((users) => {
                return res.send(users);
            });
    });

    app.get('/api/users/:id', (req, res) => {
        const id = getIdByUrl(req.url);
        data.users.getById(id)
            .then((user) => {
                return res.send(user);
            });
    });

    app.get('/api/users/:id/posts', (req, res) => {
        const id = getIdByUrl(req.url.slice(0, -6));
        data.users.getById(id)
            .then((user) => {
                data.posts.getPostsByUsername(user.name)
                    .then((posts) => {
                        res.send(posts);
                    });
            });
    });

    app.get('/api/posts', (req, res) => {
        data.posts.getAll()
            .then((posts) => {
                return res.send(posts);
            });
    });

    app.get('/api/posts/:id', (req, res) => {
        const id = getIdByUrl(req.url);
        data.posts.getById(id)
            .then((post) => {
                return res.send(post);
            });
    });
};

module.exports = { attachTo };
