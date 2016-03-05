//const serverUrl = 'http://localhost:3000';
//const serverUrl = 'http://45.55.29.22:3000';
const serverUrl = 'http://104.236.168.119:3000';
const $ = require('jquery');

module.exports = {};


module.exports.getFavedReposFromApi = function (successCallback, errCallback) {
  var options = {
    url: serverUrl + '/api/favorite',
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};

module.exports.deleteFavedReposFromApi = function (successCallback, errCallback) {
  var options = {
    url: serverUrl + '/api/favorite',
    type: 'GET',
    success: successCallback,
    error: errCallback
  };

  $.ajax(options);  
};
