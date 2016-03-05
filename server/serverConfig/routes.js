'use strict';
var request = require('request');
var _ = require('lodash');
var passport = require('passport');
var Promise = require('bluebird');

var utils = require('./utils');
var config = require('../config');

var Issues = require('../models/issues');
var User = require('../models/user');
var Pulls = require('../models/pulls');
var FaveRepos = require('../models/favoritedRepos');
var Repos = require('../models/repos');

var Issues = new Issues();
var User = new User();
var Pulls = new Pulls();
var FaveRepos = new FaveRepos();
var Repos = new Repos();

Promise.promisifyAll(utils);


module.exports = (app, express) => {

  app.get('/', (req, res) => {
    req.isAuthenticated() ? res.redirect('/app') : res.redirect('/auth/github');
  });

  app.route('/api/issues')
    .get((req, res) => {
      Issues.getIssues()
      .then((results) => res.send(results))
      .catch((err) => {
        console.log(err);
        res.status(501).send('Unknown Server Error');
      });
    });

  app.route('/api/repos')
    .get((req, res) =>{
      Repos.getRepos()
      .then((results) => res.send(results))
      .catch(() => {
        res.status(501).send('Unknown Server Error');
      });
    });

  app.route('/api/favorite')
    .get((req, res) => {
      FaveRepos.getFavoritedReposAsync(req.user.profile.username)
      .then((faveRepos) => {
        res.send(faveRepos);
      })
    })
    .post((req, res) => {
      FaveRepos.insertFavoritedRepoAsync(req.body.id, req.user.profile.username)
      .then(() => {
        res.send('received');
      });
    })
    .delete(() => {
      FaveRepos.deleteFavoritedRepoAsync(req.body.id, req.user.profile.username)
      .then(() => {
        res.send('deleted');
      })
    })

  app.route('/api/user')
    .get((req, res) =>{
      User.getUserAsync(req.user.profile.username)
      .then((userObj) => {
        res.send(userObj);
      })
    })

  // Kills the user session on logout
  app.get('/logout', (req, res) => {
    if(req.session.user) {
      req.session.destroy(console.log);
      res.redirect('https://github.com/logout');
    } else {
      res.send('You are already logged out.');
    }
  });

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback', 
    passport.authenticate('github', {failureRedirect:'/'}),
    (req, res) => {
       User.getUserAsync(req.user.profile.username)
      .then((user) => {
        let userObj = JSON.parse(req.user.profile._raw)
        if (user.login === undefined) {
          // If user is not in db, insert new user
          User.makeNewUserAsync(userObj)
          .then((data) => {
            res.redirect('/app')
          }).catch(console.log);
        } else {
          // If user is currently in db, update user data
          User.updateUserAsync(userObj)
          .then((data) => {
            res.redirect('/app')
          }).catch(console.log);
        }
      });
    });
}
      






//   app.get('/repo/pulls', function(req, res) {
//     // example request url:
//     //    http://localhost:3000/repo/pulls?repo=DapperArgentina&owner=photogenic-wound
//     utils.getPullRequestsAsync(req.user.profile.username, req.query.repo, req.query.owner)
//     .then(function(data) {
//       var pulls = utils.formatPulls(data);
//       _.forEach(pulls, function(pull) {
//         Pulls.makePullByUserAsync(pull, req.user.profile.username);
//       });
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
//     res.send('pulls');
//   });
// }

  // GitHub redirects user to /login/auth endpoint after login
  // app.get('/login/auth', function(req, res) {
  //   req.session.user = true;

  //   // Make initial request to GitHub OAuth for access token
  //   utils.getAccessTokenAsync(req.query.code)
  //   .then(function(result) {
  //     var access_token = result.body;
  //     req.session.access_token = access_token;

  //     // Make request to github for current user information
  //     utils.getUserInfoAsync(access_token)
  //     .then(function(result) {
  //       // Format user object so that it can be consumed by mysql
  //       var userObj = utils.formatUserObj(JSON.parse(result.body));
  //       req.session.userHandle = userObj.login;
  //       req.session.save(utils.logError);

  //       // Check if current user exists in the db
  //       User.getUserAsync(userObj.login)
  //       .then(function(user) {

  //         if (user.login === undefined) {
  //           // If user is not in db, insert new user
  //           User.makeNewUserAsync(userObj)
  //           .then(function(data) {
  //             console.log('new user created in db: ', data);
  //             res.redirect('/')
  //           }).catch(console.log);
  //         } else {

  //           // If user is currently in db, update user data
  //           User.updateUserAsync(userObj)
  //           .then(function(data) {
  //             console.log('updated user in db: ', data);
  //             res.redirect('/')
  //           }).catch(console.log);
  //         }
  //       }).catch(console.log);
  //     }).catch(console.log);
  //   }).catch(console.log);
  // });