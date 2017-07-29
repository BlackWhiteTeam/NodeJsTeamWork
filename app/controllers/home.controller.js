const homeController = () => {
    return {
        renderHome(req, res) {
            return res.render('home');
        },
        renderAbout(req, res) {
            return res.render('about');
        },
        setLocals(req, res, next) {
            console.log(res.locals + 'sssssssssssssss');
            res.locals.loggedIn = !!(req.user);
            res.locals.user = req.user;
            return next();
        },
    };
};

module.exports = homeController;
