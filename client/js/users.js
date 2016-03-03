const serverUrl = 'http://45.55.29.22:3000';
var $ = require('jquery');

module.exports = {};

var users = [];

var getUserFromApi = function (successCallback, errCallback) {
  var options = {
    url: serverUrl + '/api/user',
    type: 'GET',
    success: successCallback,
    error: errCallback
  };
 
  $.ajax(options); 
};

