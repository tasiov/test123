"use strict";
const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var User = function() {
 this._user = {};
};

User.prototype.getUserAsync = function(userHandle, forceUpdate) {
  if ( this._user.login && !forceUpdate ) {
    return new Promise((resolve) => resolve(this._user));
  } else {
  return db.raw(`SELECT * FROM users WHERE login='${userHandle}'`)
           .then((results) => {
            if(results[0][0]){
              Object.keys(results[0][0]).forEach((key) => {
                this._user[key] = results[0][0][key];
              });
            }
            return this._user;
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
  if ( this._user.id ) {
    return new Promise((resolve) => resolve("You are already signed in."));
  } else {
    if(user.id && user.login) {
      console.log("Making new user:" , user.login );
      // Function to map user properties to usable SQL strings
      let userKeys = [];
      let userVals = [];
       _.each(user,(val,key) => {
        userKeys.push( key + '');
        userVals.push( '"' + val + '"');
       })
      return db.raw(`INSERT INTO users ( ${userKeys.join()} ) VALUES (${userVals.join()})`)
        .then((results) => {
          this.getUserAsync(user.login, true);
        });
    }
  }
}


module.exports = User;
