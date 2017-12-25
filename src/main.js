var express = require("express");
var app = express();
var connection = require('tedious').Connection;
var request = require('tedious').Request;
var pool = require('./store/mssql');

app.get('/', function (req, res) {
    let sql = 'SELECT * FROM Products WHERE id = ? FOR JSON AUTO'
    pool.query(sql, [2])
    .then ((data) => {
        res.send(data);
    })
})  

var server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});
