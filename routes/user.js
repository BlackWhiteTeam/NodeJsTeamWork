var express = require('express');
var router = express.Router();
var db = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/database";

router.get('/', function (req, res) {
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
router.post('/', function (req, res) {
    var newUser = req.body;

    MongoClient.connect(url, function (err, db) {
        db.collection('users').insertOne(newUser, function (err, res) {
            if (err) throw err;
            console.log("1 record inserted");
            db.close();
        });
    })
});

module.exports = router;
