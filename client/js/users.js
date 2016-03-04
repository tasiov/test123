const serverUrl = 'http://localhost:3000';
//const serverUrl = 'http://45.55.29.22:3000';
var $ = require('jquery');

module.exports = {};

module.exports.getUserFromApi = function (successCallback, errCallback) {
  var options = {
    url: serverUrl + '/api/user',
    type: 'GET',
    success: successCallback,
    error: errCallback
  };
 
  $.ajax(options); 
};

module.exports.logout = function() {
  var options = {
    url: serverUrl + '/logout',
    type: 'GET',
    beforeSend: function(xhr){
    	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    	xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
  };
 
  $.ajax(options); 
};

