var request = require('request');
var config = require('../config');

var utils = require('./utils');
var Promise = require('bluebird');
Promise.promisifyAll(utils);

var User = require('../models/user');
User = new User();

var Issues = require('../models/issues');
Issues = new Issues();
var Repos = require('../models/repos');
Repos = new Repos();
var User = require('../models/user');
User = new User();

module.exports = function(app, express) {

  app.route('/api')
    .get(function(req, res){
      res.send('Hello World');
    });

  app.route('/api/issues')
    .get(function(req, res) {
      Issues.getIssues()
      .then((results) => res.send(results))
      .catch((err) => {
        console.log(err);
        res.statusCode = 501;
        res.send('Unknown Server Error');
      });
    });

  app.route('/api/repos')
    .get(function(req, res){
      Repos.getRepos()
      .then((results) => res.send(results))
      .catch(() => {
        res.statusCode = 501;
        res.send('Unknown Server Error');
      });
    });

  app.get('/login/auth', function(req, res) {
    req.session.user = true;

    // Make initial request to GitHub OAuth for access token
    utils.getAccessTokenAsync(req.query.code)
    .then(function(result) {
      var access_token = result.body;
      req.session.access_token = access_token;

      // Make request to github for current user information
      utils.getUserInfoAsync(access_token)
      .then(function(result) {
        // Format user object so that it can be consumed by mysql
        var userObj = utils.formatUserObj(JSON.parse(result.body));
        req.session.userHandle = userObj.login;

        // Check if current user exists in the db
        User.getUserAsync(userObj.login)
        .then(function(user) {
          console.log('user: ', user);
          if (user.length === 0) {
            // If user is not in db, insert new user
            User.makeNewUserAsync(userObj)
            .then(function(data) {
              console.log('new user created in db: ', data);
            }).catch(utils.logError);
          } else {
            // User.updateUserAsync(userObj)
          }
        }).catch(utils.logError);
      }).catch(utils.logError);
    }).catch(utils.logError);

    res.redirect('/');
  });

  // GitHub redirects user to /login/auth endpoint after login
  // app.get('/login/auth', function(req, res) {
  //   req.session.user = true;

  //   // Make initial request to GitHub OAuth for access token
  //   request({
  //     url: 'https://github.com/login/oauth/access_token',
  //     qs: {client_id: config.githubClientId, client_secret: config.githubSecret, code: req.query.code},
  //     method: 'POST'
  //   }, function(error, response, body) {
  //     if(error) {
  //       console.log('err: ', error);
  //     } else {
  //       access_token = body;

  //       // Make request to github for current user information
  //       request({
  //         url: 'https://api.github.com/user?' + access_token,
  //         headers: {'User-Agent': 'Good-First-Ticket'}
  //       }, function(error, response, body) {
  //         if (error) {
  //           console.log('err: ', error);
  //         } else {
  //           var userObj = utils.formatUserObj(JSON.parse(body));

  //           User.getUserAsync(userObj.id)
  //           .then(function(user) {
  //             if (user.length === 0) {
  //               console.log('no user: ', user);
  //               User.makeNewUser(userObj)
  //               .then(function(data) {
  //                 console.log('pass new user: ', data);
  //               })
  //               .catch(function(data) {
  //                 console.log('fail new user: ', data);
  //               });
  //             } else {
  //               console.log('yes user');
  //             }
  //           })
  //           .catch(function(err) {
  //             console.log(err);
  //           });
  //         }
  //       });
  //     }
  //     res.redirect('/');
  //   });
  // });
}
