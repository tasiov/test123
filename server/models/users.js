'use strict';
const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var Users = function() {
 this._users = {};
};

User.prototype.getUserAsync = (userHandle, forceUpdate) => {
  if (this._user[userHandle] && !forceUpdate ) {
    return new Promise((resolve) => resolve(this._user[userHandle]));
  } else {
    return db.raw(`SELECT * FROM users`)
      .then((results) => {
        let RowDataArray = Object.keys(results[0]).map(k => results[0][k]);
        RowDataArray.forEach(RowData => {
          let login = RowData.login;
          Object.keys(RowData).forEach(key => {
            this._users[login][key] = RowData[key];
          });
        })
        return this._user[userHandle];
      });
    }
}

User.prototype.updateUserAsync = function(userObj) {
  let userQuery = Object.keys(userObj).reduce((prev, key, index, coll) => {
    prev = prev + key + '="' + userObj[key] + '"';
    return index !== (coll.length -1) ? prev + ',' : prev;
  }, "");

  return db.raw(`UPDATE users SET ${userQuery} WHERE login='${userObj.login}'`)
  .then( () => {
    return this.getUserAsync(userObj.login, true);
  });
}

User.prototype.makeNewUserAsync = function(user) {
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
