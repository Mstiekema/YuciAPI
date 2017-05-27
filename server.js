var app = require('express')();
var reqst = require('request');
var conf = require("./config.js");
var user = require("./user.js");

// User API
user.followage(app, conf, reqst);
user.followsince(app, conf, reqst);
user.age(app, conf, reqst);
user.id(app, conf, reqst)

var test = "Testing var"

app.get('/', function(req, res) {
  res.send(test);
});

app.listen(5000, function () {
	console.log('YuciAPI is now up and running')
})