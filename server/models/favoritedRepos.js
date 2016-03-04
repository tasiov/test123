'use strict';

const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var FavoritedRepos = function() {
	this._favoritedRepos = {empty: true};
}

let dbJoinTableQuery = `users INNER JOIN repos_users 
													ON users.internal_id = repos_users.user_id
												INNER JOIN repos
													ON repos_users.repo_id = repos.internal_id`

FavoritedRepos.prototype.getFavoritedReposAsync = function(userHandle, forceRefresh) {
  if (!this._favoritedRepos.empty && !forceRefresh) {
  return new Promise((resolve) => resolve(this._favoritedRepos));
  } else {
  return db.raw(`SELECT repos.*
   							FROM ${dbJoinTableQuery} 
  							WHERE users.login = '${userHandle}'`)
           .then((results) => {
           		this._favoritedRepos = {empty: true};
              var RowDataArray = Object.keys(results[0]).map(k => results[0][k]);
              RowDataArray.forEach(RowData => {
                var regObj = {};
                Object.keys(RowData).forEach(key => regObj[key] = RowData[key]);
                this._favoritedRepos[regObj.id] = regObj;
              })
              this._favoritedRepos.empty = false;
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

FavoritedRepos.prototype.deleteFavoritedRepoAsync = function(gitRepoId, userHandle) {
	return Promise.all([
			db.raw(`SELECT internal_id FROM repos WHERE id = ${gitRepoId};`),
			db.raw(`SELECT internal_id FROM users WHERE login = '${userHandle}';`)
		]).then((allResults) => {
			var repoInternalId = allResults[0][0][0]['internal_id'];
			var userInternalId = allResults[1][0][0]['internal_id'];
			return db.raw(`DELETE FROM repos_users WHERE 
				repo_id=${repoInternalId} && user_id=${userInternalId};`)
							.then( () => {
								return this.getFavoritedReposAsync(userHandle, true);
							});
		});
}

module.exports = FavoritedRepos;
