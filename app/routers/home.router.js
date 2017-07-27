const attachTo = (app, { homeController }) => {
    app.get('*', homeController.setLocals);
    app.get('/', homeController.renderHome);
    app.get('/home', homeController.renderHome);
    app.get('/about', homeController.renderAbout);
};

module.exports = { attachTo };
