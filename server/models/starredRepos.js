'use strict';

const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var StarredRepos = function() {
	this._starredRepos = [];
}


let dbJoinTableQuery = `users INNER JOIN repos_users 
													ON users.internal_id = repos_users.user_id
												INNER JOIN repos
													ON repos_users.repo_id = repos.internal_id`

										



StarredRepos.prototype.getStarredReposAsync = function(userHandle) {
  if ( false && this._user.login ) {
  return new Promise((resolve) => resolve(this._starredRepos));
  } else {
  return db.raw(`SELECT repos.name FROM ${dbJoinTableQuery} 
  							WHERE users.login = '${userHandle}'`)
           .then((results) => {
              this._starredRepos = results[0];
              return results[0];
           }); 
  }

}

module.exports = StarredRepos;
