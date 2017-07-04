const express = require('express');
const router = express.Router();

module.exports = function(app) {
    app.use('/', router);
};

router.get('/', function(req, res) {
    res.render('home');
});

//TODO - move it

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/login', function(req, res) {
    res.render('login');
});

