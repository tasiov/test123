const React = require('react');
const NavBar = require('./NavBar'); 
const Issues = require('../js/issues');
const Repos = require('../js/repos'); 
const linksList = [
  {
    name: "tickets", url: '/'
  },
  {
    name: "repositories", url: '/repos'
  }, 
  {
    name: "getting started", url: '/resources'
  }
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

  componentDidMount() {
    this.getIssues();
    this.getRepos();
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
              getIssues: this.getIssues.bind(this),
              getRepos: this.getRepos.bind(this)
          })}
        </div>
      </div>
    </div>
    );
  }

};
module.exports = App;