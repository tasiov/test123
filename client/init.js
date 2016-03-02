
//Code that starts app goes here
const React = require('react');
const ReactDOM = require('react-dom');
const { Router, Route, Link, IndexRoute, hashHistory, RouterContext } = require('react-router');

const App = require('./components/app');
const TicketList = require('./components/tickets/TicketList'); 
const RepoList = require('./components/repos/RepoList'); 
const RepoProfile = require('./components/repos/RepoProfile'); 
const ResourceList = require('./components/ResourceList');
const Profile = require('./components/user/UserMain');

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={TicketList} />
      <Route path='repos' component={RepoList} />
      <Route path='repoProfile/:repoId' component={RepoProfile} />
      <Route path='resources' component={ResourceList} />
      <Route path='profile' component={Profile} />
    </Route>
  </Router>
), document.getElementById('app'));



