const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var User = function() {
  let this._user = {};
};

User.prototype.getUser = function(id) {

  if ( this._user.id ) {
    return new Promise((resolve) => resolve(this._user));
  } else {
  return db.raw(`SELECT * FROM USERS
    WHERE id='${id}'`)
    .then((results) => {
      this._user = reults[0];
      return this._user;
    });
  }

}

User.prototype.makeNewUser = function(user) {

  if ( this._user.id ) {
    return new Promise((resolve) => resolve(this._user));
  } else {
    let userKeys = [];
    let userVals = [];
     _.each(user,(val,key) => {
      userKeys.push( key + '');
      userVals.push( val + '');
     })

  return db.raw(`INSERT INTO USERS (${userkeys.join(',')})
    VALUES(${userVals.join(',')})'`)
    .then((results) => {
      this._user = reults[0];
      return this._user;
    });
  }
  
}


module.exports = User;