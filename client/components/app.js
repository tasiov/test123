const React = require('react');
const NavBar = require('./nav/NavBar'); 
const Issues = require('../js/issues');
const Repos = require('../js/repos'); 
const Users = requrie('../js/users');

const linksList = [
  {name: "my profile", url: '/profile'}
  {name: "tickets", url: '/'},
  {name: "repositories", url: '/repos'},
  {name: "getting started", url: '/resources'},
];


const App = class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      route: '/',
      reposToRender: [],
      ticketsToRender: [],
      reposToRender: [],
      numberOfRepos: 0,
      numberOfTickets: 0,
      languages: []
    };
  }
  
  getIssues(searchTerm, language){
    //Fetch issues;
    var self = this;

    Issues.getIssues(function(data) {
      console.log(data);
      self.setState({
        numberOfTickets: data.length,
        ticketsToRender: data.slice(0,199)
      });
    }, console.log, searchTerm, language);
  }
  
  getRepos(searchTerm, language){
    //Fetch repos;
    //refactor to exclude 'self/this' with es6 syntax?
    var self = this;
    Repos.getRepos(function(data) {
      self.setState({
        numberOfRepos: data.length,
        reposToRender: data.slice(0,199)
      });
    }, console.log, searchTerm, language);
  }

  setLanguages () {
    //We should only run this once per component rendering (ie. componentDidMount)
    //Multiple calls to material_select screws up the rendering
    Repos.getLanguages((languages) => {
      this.setState({
        languages: languages
      });
    });
  }

  componentWillMount() {
    this.getIssues();
    this.getRepos();
    this.setLanguages();
  }

  render () {
    return (
    <div className='app-shell grey lighten-2'>
      <NavBar links={linksList}/>
      <div className="row">
        <div className="main col-sm-10 container">
          {React.cloneElement(this.props.children, {
              route: this.state.route,
              reposToRender: this.state.reposToRender,
              ticketsToRender: this.state.ticketsToRender,
              reposToRender: this.state.reposToRender,
              numberOfRepos: this.state.numberOfRepos,
              numberOfTickets: this.state.numberOfTickets,
              languages: this.state.languages,
              getIssues: this.getIssues.bind(this),
              getRepos: this.getRepos.bind(this),
              user: {
                "login": "octocat",
                "id": 1,
                "avatar_url": "https://avatars3.githubusercontent.com/u/13843284?v=3&s=460",
                "gravatar_id": "",
                "url": "https://avatars3.githubusercontent.com/u/13843284?v=3&s=460",
                "html_url": "https://github.com/octocat",
                "followers_url": "https://api.github.com/users/octocat/followers",
                "following_url": "https://api.github.com/users/octocat/following{/other_user}",
                "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
                "organizations_url": "https://api.github.com/users/octocat/orgs",
                "repos_url": "https://api.github.com/users/octocat/repos",
                "events_url": "https://api.github.com/users/octocat/events{/privacy}",
                "received_events_url": "https://api.github.com/users/octocat/received_events",
                "type": "User",
                "site_admin": false,
                "name": "monalisa octocat",
                "company": "GitHub",
                "blog": "https://github.com/blog",
                "location": "San Francisco",
                "email": "octocat@github.com",
                "hireable": false,
                "bio": "There once was...",
                "public_repos": 2,
                "public_gists": 1,
                "followers": 20,
                "following": 0,
                "created_at": "2008-01-14T04:33:35Z",
                "updated_at": "2008-01-14T04:33:35Z",
                "total_private_repos": 100,
                "owned_private_repos": 100,
                "private_gists": 81,
                "disk_usage": 10000,
                "collaborators": 8,
                "plan_name": "Medium",
                "plan_space": 400,
                "plan_private_repos": 20,
                "plan_collaborators": 0,
                "game_tickets_completed": 9001,
                "game_level": 99
              },
              favorites: { "results": [
                {
                  "name":"test name 1",
                  "org_name":"org test name 1",
                  "html_url":"#",
                  "description":"test description 1",
                  "language":"javascript"
                },
                {
                  "name":"test name 2",
                  "org_name":"org test name 2",
                  "html_url":"#",
                  "description":"test description 2",
                  "language":"javascript"
                },
                {
                  "name":"test name 3",
                  "org_name":"org test name 3",
                  "html_url":"#",
                  "description":"test description 3",
                  "language":"javascript"
                },
                {
                  "name":"test name 4",
                  "org_name":"org test name 4",
                  "html_url":"#",
                  "description":"test description 4",
                  "language":"javascript"
                }
              ]}
          })}
        </div>
      </div>
    </div>
    );
  }

};
module.exports = App;