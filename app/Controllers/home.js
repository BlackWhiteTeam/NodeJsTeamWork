const express = require('express');
const router = express.Router();

module.exports = function(app) {
    app.use('/', router);
};

router.get('/', function(req, res) {
    res.render('index', {
        title: 'Two boobs ahead',
    });
});

