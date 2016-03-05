'use strict';
const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var Users = function() {
 this._users = {};
};

Users.prototype.getUserAsync = function (userHandle, forceUpdate) {
  if (this._users[userHandle] && !forceUpdate ) {
    return new Promise((resolve) => resolve(this._users[userHandle]));
  } else {
    return db.raw(`SELECT * FROM users`)
      .then((results) => {
        let RowDataArray = Object.keys(results[0]).map(k => results[0][k]);
        RowDataArray.forEach(RowData => {
          this._users[RowData.login] = {};
          Object.keys(RowData).forEach(key => {
            this._users[RowData.login][key] = RowData[key];
          });
        })
        return this._users[userHandle];
      });
    }
}

Users.prototype.updateUserAsync = function (user) {
  if(user.id && user.login) {
    let userQuery = Object.keys(user).reduce((prev, key, index, coll) => {
      prev = prev + key + '="' + user[key] + '"';
      return index !== (coll.length -1) ? prev + ',' : prev;
    }, "");

    return db.raw(`UPDATE users SET ${userQuery} WHERE login='${user.login}'`)
    .then( () => this.getUserAsync(user.login, true));
  }
}

Users.prototype.makeNewUserAsync = function (user) {
  if(user.id && user.login) {
    // Function to map user properties to usable SQL strings
    let userKeys = [];
    let userVals = [];
     _.each(user,(val,key) => {
      userKeys.push( key + '');
      userVals.push( '"' + val + '"');
     })
    return db.raw(`INSERT INTO users ( ${userKeys.join()} ) VALUES (${userVals.join()})`)
      .then(() => this.getUserAsync(user.login, true));
  }
}


module.exports = Users;
