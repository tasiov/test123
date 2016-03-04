var config = require('../config');
var request = require('request');
var _ = require('lodash');

// unless filters out 'path' from the middleware that uses it
module.exports.unless = function(path, middleware) {
  return function(req, res, next) {
    if (path === req.path) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

// getAccessToken takes the code retrieved from GitHub
// and uses it to get the access token from the gitHub oauth endpoint
module.exports.getAccessToken = function(code, callback) {
  var requestParams = {
    url: 'https://github.com/login/oauth/access_token',
    qs: {client_id: config.githubClientId, client_secret: config.githubSecret, code: code},
    method: 'POST'
  };

  request(requestParams, function(error, response) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
};

// getUserInfo uses the access_token for the session user
// to get the user data from the github API
module.exports.getUserInfo = function(token, callback) {
  var requestParams = {
    url: 'https://api.github.com/user?' + token,
    headers: {'User-Agent': 'Good-First-Ticket'},
    qs: {client_id: config.githubClientId, client_secret: config.githubSecret}
  };

  request(requestParams, function(error, response) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
};

// transforms the 'userObj' into an object that
// can be consumed by our mysql db
module.exports.formatUserObj = function(userObj) {
  var formatObj = Object.assign(userObj);
  formatObj.site_admin = Number(formatObj.site_admin);
  formatObj.hireable = Number(formatObj.hireable);
  formatObj.created_at = new Date(formatObj.created_at).toISOString().slice(0, 19).replace('T', ' ');
  formatObj.updated_at = new Date(formatObj.updated_at).toISOString().slice(0, 19).replace('T', ' ');
  return formatObj;
}

// getPullRequests takes in a username and repo as arguments
// and returns an object containing all the open and closed
// pull requests instantiated by that user
module.exports.getPullRequests = function(userHandle, repo, owner, callback) {
  // example: https://api.github.com/repos/photogenic-wound/DapperArgentina/pulls?state=closed
  var requestParams = {
    url: 'https://api.github.com/repos/'
       + owner + '/'
       + repo + '/pulls?state=all',
    headers: {'User-Agent': 'Good-First-Ticket'},
    qs: {client_id: config.githubClientId, client_secret: config.githubSecret}
  };

  request(requestParams, function(error, response) {
    if (error) {
      callback(error, null);
    } else {
      pullsArray = JSON.parse(response.body);
      var userPullReqs = [];
      _.forEach(pullsArray, function(pullObj) {
        if (pullObj.user.login === userHandle) {
          userPullReqs.push(pullObj);
        }
      });
      callback(null, userPullReqs);
    }
  });
};

// transforms the 'pullsObj' into an object that
// can be consumed by our mysql db
module.exports.formatPulls = function(pullsArr) {
  var formattedArr = [];
  _.forEach(pullsArr, function(obj) {
    var pullObj = {
      name: obj.title,
      merged: obj.merged !== ""
    }
    formattedArr.push(pullObj);
  });
  return formattedArr;
};
