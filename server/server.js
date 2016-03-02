var express = require('express');
var app = express();
var db = require('./db/database');

var Issues = require('./models/issues');
Issues = new Issues();
var Repos = require('./models/repos');
Repos = new Repos();
var User = require('./models/user');
User = new User();

// middleware.js houses all the middleware that is run by express
require(__dirname + '/serverConfig/middleware.js')(app, express);

// routes.js defines the application's endpoints
require(__dirname + '/serverConfig/routes.js')(app, express);

// app.use(express.static(__dirname + '/../client'));

var port = process.env.PORT || 3000;

console.log(`server running on port ${port} in ${process.env.NODE_ENV} mode`);
// start listening to requests on port 3000
app.listen(port);

// export our app for testing and flexibility, required by index.js
module.exports = app;
