"use strict";
const Promise = require('bluebird');
var db = require('../db/database');
var _ = require('lodash');

var User = function() {
 this._user = {};
};

User.prototype.getUserAsync = function(id) {
  console.log(this._user.id);
  if ( this._user.id ) {
    return new Promise((resolve) => resolve(this._user));
  } else {
  console.log("inside if statement");
  return db.raw(`SELECT * FROM users WHERE id='${id}'`)
           .then((results) => {
              this._user = results[0];
              return this._user;
           }); 
  }

}

User.prototype.makeNewUser = function(user) {

  if ( this._user.id ) {
    return new Promise((resolve) => resolve("You are already signed in."));
  } else {
    if(user.id && user.login) {

      // Function to map user properties to usable SQL strings
      let userKeys = [];
      let userVals = [];
       _.each(user,(val,key) => {
        userKeys.push( key + '');
        userVals.push( '"' + val + '"');
       })

      return db.raw(`INSERT INTO users ( ${userKeys.join()} )
      VALUES (${userVals.join()})`)
        .then((results) => {
          this._user = results[0];
          return this._user;
        });      
    }
  }
  
}
User.prototype.howTables = function() {
 
  db.raw(`SHOW TABLES`)
   .then((results) => {
      console.log(results);
   }); 
  

}


module.exports = User;