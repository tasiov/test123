var request = require('request');
var config = require('../config');

var utils = require('./utils');
var Promise = require('bluebird');
Promise.promisifyAll(utils);

var Issues = require('../models/issues');
Issues = new Issues();
var Repos = require('../models/repos');
Repos = new Repos();
var User = require('../models/user');
User = new User();
var FaveRepos = require('../models/favoritedRepos');
FaveRepos = new FaveRepos();

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

  app.route('/api/favorite')
    .get(function(req, res) {
      FaveRepos.getFavoritedReposAsync(req.session.userHandle)
      .then((faveRepos) => {
        console.log('got all favorites');
        res.send(faveRepos);
      })
    })
    .post(function(req, res) {
      FaveRepos.insertFavoritedRepoAsync(req.body.id, req.session.userHandle)
      .then(() => {
        console.log(req.body.id, req.session.userHandle);
        res.send('received');
      });
    })
    .delete(() => {
      FaveRepos.deleteFavoritedRepoAsync(req.body.id, req.session.userHandle)
      .then(() => {
        console.log('deleted');
        res.send('deleted');
      })
    })


  app.route('/api/user')
    .get(function(req, res){
      console.log('getting user');
      User.getUserAsync(req.session.userHandle)
      .then((userObj) => {
        res.send(userObj);
      })
    })

  // Kills the user session on logout
  app.get('/logout', function(req, res) {
    if(req.session.user) {
      req.session.destroy(function(err){
        res.send('You have been logged out.');
      });
    } else {
      res.send('You are already logged out.');
    }
  });

  // GitHub redirects user to /login/auth endpoint after login
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
        req.session.save(utils.logError);

        // Check if current user exists in the db
        User.getUserAsync(userObj.login)
        .then(function(user) {

          if (user.login === undefined) {
            // If user is not in db, insert new user
            User.makeNewUserAsync(userObj)
            .then(function(data) {
              console.log('new user created in db: ', data);
              res.redirect('/')
            }).catch(utils.logError);
          } else {

            // If user is currently in db, update user data
            User.updateUserAsync(userObj)
            .then(function(data) {
              res.redirect('/')
            }).catch(utils.logError);
          }
        }).catch(utils.logError);
      }).catch(utils.logError);
    }).catch(utils.logError);
  });
}
