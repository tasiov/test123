const React = require('react');
const NavBar = require('./nav/NavBar'); 
const Issues = require('../js/issues');
const Repos = require('../js/repos'); 
const Users = require('../js/users');

const linksList = [
  {name: "my profile", url: '/profile'},
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

  getUser(){
    var self = this;
    Users.getUserFromApi((result) => {
      console.log(result);
      self.setState({user:result});
    }, (result) => {
      console.log("Err",result)
    })
  }
  
  getIssues(searchTerm, language){
    //Fetch issues;
    var self = this;

    Issues.getIssues(function(data) {
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
    this.getUser();
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
              user: this.state.user,
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