var express = require('express')
var app = express();
var reqst = require('request');
var conf = require("./config.js");
var user = require("./user.js");

// Basic website stuff
app.use(express.static('.'));
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname);
app.set('view engine', 'html');

// User API
user.followage(app, conf, reqst);
user.followsince(app, conf, reqst);
user.age(app, conf, reqst);
user.id(app, conf, reqst);
user.followers(app, conf, reqst)
user.game(app, conf, reqst)
user.title(app, conf, reqst)

app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(5000, function () {
	console.log('YuciAPI is now up and running')
})