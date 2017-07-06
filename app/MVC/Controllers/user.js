function userController(data) {
    return {
        getHome(req, res) {
            res.render('home');
        },

        getRegister(req, res) {
            res.render('register');
        },

        getLogin(req, res) {
            res.render('login');
        },
    };
}

module.exports = userController;
