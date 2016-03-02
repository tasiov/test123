"use strict";
const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var Pulls = function() {
	this._pulls = [];
} 

Pulls.prototype.makePullByUser = function(pull, callback) {
	let userHandle = pull.user;
	pull.closed = Number(pull.closed);
	delete pull.user;

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
  





// Pulls.prototype.getPullsByUser = function (id) {
//   var self = this;
//   if (this._issues.length === 0 ||
//    hoursSinceLastFetch > 1) {
//     return db.raw(`select i.*, r.language, r.id as repo_id 
//             from Pulls i 
//             left join repos r on i.org_name=r.org_name and i.repo_name=r.name 
//             order by created_at desc;`)
//             .then((results) => {
//               results[0].forEach((issue) => {
//                 issue.labels = JSON.parse(issue.labels);
//               });
//               this._issues = results[0];
//               this._lastUpdateDate = new Date();
//               return this._issues;
//             })
//             .catch(console.log);
//   } else {
//     return new Promise((resolve) => resolve(this._issues));
//   }
// };

module.exports = Pulls;