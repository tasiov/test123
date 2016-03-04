const serverUrl = 'http://localhost:3000';
//const serverUrl = 'http://45.55.29.22:3000';
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

