"use strict";
const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var Pulls = function() {
	this._pulls = [];
	this._userId = null;
} 

Pulls.prototype.makePullByUser = function(pull, callback) {
	let userHandle = pull.user;
	pull.closed = Number(pull.closed);
	delete pull.user;
	this._pulls.push(pull);

	db.raw(`SELECT internal_id FROM users WHERE login='${userHandle}';`)
  .then((results) => {
  	pull['user_id'] = results[0][0]['internal_id'];

	  let pullKeys = [];
	  let pullVals = [];
	   _.each(pull,(val,key) => {
	    pullKeys.push( key + '');
	    pullVals.push( '"' + val + '"');
	  })

	  return db.raw(`INSERT INTO pulls ( ${pullKeys.join()} )
	  VALUES (${pullVals.join()})`)
	  .then((results) => {
	    	console.log(results);
	  });    
  })
  .catch(console.log);
}
 

Pulls.prototype.getPullsByUser = function (userHandle) {
  var self = this;
  return db.raw(`SELECT internal_id FROM users WHERE login='${userHandle}';`)
  .then((results) => {
  	let userId = results[0][0]['internal_id'];
  	if (this._pulls.length === 0) {
  	  return db.raw(`SELECT * FROM pulls WHERE user_id='${userId}';`)
  	          .then((results) => {
  	          	this._pulls = results[0]
  	          	return this._pulls
  	          })
  	          .catch(console.log);
  	} else {
  	  return new Promise((resolve) => resolve(this._pulls));
  	}
  });
};

module.exports = Pulls;