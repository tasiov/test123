var request = require('request');

var Issues = require('./models/issues');
Issues = new Issues();
var Repos = require('./models/repos');
Repos = new Repos();
var User = require('./models/user');
User = new User();

module.exports = function(app, express) {
  var access_token;

  app.route('/api')
    .get(function(req, res){
      res.send('Hello World');
    });

  app.route('/api/issues')
    .get(function(req, res) {
      Issues.getIssues()
      .then((results) => res.send(results))
      .catch((err) => {
        console.log(err);
        res.statusCode = 501;
        res.send('Unknown Server Error');
      });
    });

  app.route('/api/repos')
    .get(function(req, res){
      Repos.getRepos()
      .then((results) => res.send(results))
      .catch(() => {
        res.statusCode = 501;
        res.send('Unknown Server Error');
      });
    });

  // GitHub redirects user to /login/auth endpoint after login
  app.get('/login/auth', function(req, res) {
    req.session.user = true;
    request({
      url: 'https://github.com/login/oauth/access_token',
      qs: {client_id: '139d346c12b54d57adc5', client_secret: '3ac7e46e12540f1b1c743db3a52e006fe7116bbd', code: req.query.code},
      method: 'POST'
    }, function(error, response, body) {
      if(error) {
        console.log(error);
      } else {
        access_token = body;
      }
      res.redirect('/');
    });
  });
}
