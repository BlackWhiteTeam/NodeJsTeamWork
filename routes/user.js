var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    Promise.resolve()
        .then(() => {
            //TODO authorization
            if (true) {
                res.render('register');
            } else {
                res.redirect('/home');
            }
        });
});

module.exports = router;
