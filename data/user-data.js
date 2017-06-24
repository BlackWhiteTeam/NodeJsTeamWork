var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/database";

MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Database created!");
    db.createCollection("users", function (err, res) {
        if (err) throw err;
        console.log("Table created!");
        db.close();
    });
    var myobj = { username: "Pesho", passhash: "123456Hashed" };
    db.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 record inserted");
        db.close();
    });
    db.collection("users").find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });

});