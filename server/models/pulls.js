"use strict";
const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var Pulls = function() {
	this._pulls = [];
} 

Pulls.prototype.getUserIdAsync = function(userHandle) {
		return db.raw(`SELECT internal_id FROM users WHERE login='${userHandle}';`)
	  .then((results) => {
	  	return results[0][0]['internal_id'];
	  });
}

Pulls.prototype.makePullByUserAsync = function(pull) {
	return this.getUserIdAsync(pull.user)
	.then((user_id) => {
		pull.user_id = user_id;
		pull.closed = Number(pull.closed);
		delete pull.user;
		this._pulls.push(pull);

	  let pullKeys = [];
	  let pullVals = [];
	   _.each(pull,(val,key) => {
	    pullKeys.push( key + '');
	    pullVals.push( '"' + val + '"');
	  })

	  return db.raw(`INSERT INTO pulls ( ${pullKeys.join()} ) VALUES (${pullVals.join()})`)
	  .then(() => this._pulls)
	  .catch(console.log);
	});
}
 

Pulls.prototype.getPullsByUserAsync = function (userHandle) {
		if (this._pulls.length !== 0 && !(userHandle)) {
		  return new Promise((resolve) => resolve(this._pulls));
		} else {
			return this.getUserIdAsync(userHandle)
		  .then( (userId) => {
		  	return db.raw(`SELECT * FROM pulls WHERE user_id='${userId}';`)
		          .then((results) => {
		          	this._pulls = results[0]
		          	return this._pulls
		          })
		          .catch(console.log);
		  });
		}
};

module.exports = Pulls;