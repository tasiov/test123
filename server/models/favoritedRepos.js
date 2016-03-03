'use strict';

const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var FavoritedRepos = function() {
	this._favoritedRepos = [];
}

let dbJoinTableQuery = `users INNER JOIN repos_users 
													ON users.internal_id = repos_users.user_id
												INNER JOIN repos
													ON repos_users.repo_id = repos.internal_id`

FavoritedRepos.prototype.getFavoritedReposAsync = function(userHandle, forceRefresh) {
  if (!forceRefresh && this._user.login) {
  return new Promise((resolve) => resolve(this._favoritedRepos));
  } else {
  return db.raw(`SELECT repos.name FROM ${dbJoinTableQuery} 
  							WHERE users.login = '${userHandle}'`)
           .then((results) => {
              this._favoritedRepos = results[0];
              return this._favoritedRepos;
           }); 
  }
}

FavoritedRepos.prototype.insertFavoritedRepoAsync = function(gitRepoId, userHandle) {
	return Promise.all([
			db.raw(`SELECT internal_id FROM repos WHERE id = ${gitRepoId};`),
			db.raw(`SELECT internal_id FROM users WHERE login = '${userHandle}';`)
		]).then((allResults) => {
			var repoInternalId = allResults[0][0][0]['internal_id'];
			var userInternalId = allResults[1][0][0]['internal_id'];
			return db.raw(`INSERT INTO repos_users (repo_id, user_id) 
							VALUES (${repoInternalId}, ${userInternalId});`)
							.then( () => {
								return this.getFavoritedReposAsync(userHandle, true);
							});
		});
}

module.exports = FavoritedRepos;
