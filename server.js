var express = require('express')
var app = express()

var test = "Testing var"

app.get('/', function(req, res) {
  res.send(test);   
});

app.listen(5000, function () {
	console.log('YuciAPI is now up and running')
})