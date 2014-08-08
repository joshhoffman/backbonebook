var http = require('http');

var canned = require('canned');

var opts = { cors: true, logger: process.stdout };
can = canned('.', opts);

var express = require('express');
var app = express();

var logger = require('morgan');
var proxy = require('proxy-middleware');
var url = require('url');

app.use(logger("dev", {immediate: true}));

// proxy
app.use('/api', proxy(url.parse('http://0.0.0.0:5001/api')));

app.use(express.static(__dirname + '/static'));
app.use(can);

var port = 3000;
http.createServer(app).listen(port, function() {
    console.log('front end listening on port %s', port);
});