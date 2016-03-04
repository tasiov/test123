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

Pulls.prototype.makePullByUserAsync = function(pull, userHandle) {

	return this.getUserIdAsync(userHandle)
	.then((user_id) => {
		pull.user_id = user_id;
		pull.merged = Number(pull.merged);
		this._pulls.push(pull);

	  let pullKeys = [];
	  let pullVals = [];
	   _.each(pull,(val,key) => {
	    pullKeys.push( key + '');
	    pullVals.push( '"' + val + '"');
	  })

	  return db.raw(`INSERT INTO pulls ( ${pullKeys.join()} ) VALUES (${pullVals.join()})`)
	  .then(() => this.getPullsByUserAsync(userHandle, true))
	  .catch(console.log);
	});
}


Pulls.prototype.getPullsByUserAsync = function (userHandle, forceUpdate) {
		if (this._pulls.length !== 0 && !(forceUpdate)) {
		  return new Promise((resolve) => resolve(this._pulls));
		} else {
			return this.getUserIdAsync(userHandle)
		  .then( (userId) => {
		  	return db.raw(`SELECT * FROM pulls WHERE user_id='${userId}';`)
		          .then((results) => {
		          	var RowDataArray = Object.keys(results[0]).map(k => results[0][k]);
		          	this._pulls = RowDataArray.map(RowData => {
		          	  var regObj = {};
		          	  Object.keys(RowData).forEach(key => regObj[key] = RowData[key]);
		          	  return regObj;
		          	})
		          	return this._pulls;
		          })
		          .catch(console.log);
		  });
		}
};

module.exports = Pulls;
