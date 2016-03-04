var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('../config');
var utils = require('./utils');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(session( {
    secret: 'it\'s a secret',
    resave: false,
    saveUninitialized: false
  }));

  app.use(utils.unless('/login/auth', function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      /* If there is no active user session, redirect the client to the
       * GitHub OAuth page.
       */
      var ghAuthUrl = 'https://github.com/login/oauth/authorize?client_id='
       + config.githubClientId
       + '&redirect_uri=http://104.236.168.119:3000/login/auth';
      res.redirect(ghAuthUrl);
    }
  }));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use(express.static(__dirname + '/../../client'));
};

