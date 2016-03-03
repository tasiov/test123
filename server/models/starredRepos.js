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

										



StarredRepos.prototype.getStarredReposAsync = function(userHandle, forceRefresh) {
  if ( !forceRefresh && this._user.login ) {
  return new Promise((resolve) => resolve(this._starredRepos));
  } else {
  return db.raw(`SELECT repos.name FROM ${dbJoinTableQuery} 
  							WHERE users.login = '${userHandle}'`)
           .then((results) => {
              this._starredRepos = results[0];
              return this._starredRepos;
           }); 
  }

}

StarredRepos.prototype.insertStarredRepoUser = function(gitRepoId, userHandle) {
	return Promise.all([
			db.raw(`SELECT internal_id FROM repos WHERE id = ${gitRepoId};`),
			db.raw(`SELECT internal_id FROM users WHERE login = '${userHandle}';`)
		]).then((allResults) => {
			var repoInternalId = allResults[0][0][0]['internal_id'];
			var userInternalId = allResults[1][0][0]['internal_id'];
			return db.raw(`INSERT INTO repos_users (repo_id, user_id) 
							VALUES (${repoInternalId}, ${userInternalId});`)
							.then( () => {
								return this.getStarredReposAsync(userHandle, true);
							});
		});
}

module.exports = StarredRepos;
