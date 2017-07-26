const userController = (data) => {
    return {
        renderAllUsers(req, res) {
            return data.users.getAll()
                .then((users) => {
                    return res.render('users/all', {
                        context: users,
                    });
                });
        },
    };
};

module.exports = userController;
