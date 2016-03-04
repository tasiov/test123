const React = require('react');
const Repos = require('../../js/repos');
const Issues = require('../../js/issues');
const TicketEntry = require('../tickets/TicketEntry');
const TimeAgo = require('react-timeago');

class RepoProfile extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      repoToRender: {},
      issues: []
    };

  }
  isFavorite() {
    return !!(this.props.favedRepos[this.props.routeParams.repoId]);
  }

  getRepo(id) {
    //Fetch repo and tickets;
    var that = this;
    Repos.getRepoById(id, (data) => this.setState({repoToRender: data}));
    Issues.getIssuesByRepoId(id, data => this.setState({issues: data}));
  }

  favorRepo() {
    if(!this.isFavorite()) {
      $.post('/api/favorite', this.state.repoToRender, (data) => {
        this.props.getFavedRepos();
      });
    }
  }
  
  componentWillMount () {
    this.getRepo(this.props.routeParams.repoId);
  }


  render() {
    let favoritedText = this.isFavorite() ? 'Favorited' : 'Add to Favorites'
   
 
    return (
    <div>
      <div className="row main-repo-view"> 
        <div className="col s10">
          <h4>repo profile</h4>
          <div className="card white">
              <div className="card-content black-text">
                <span className="card-title"><a className="cyan-text lighten-2" href={this.state.repoToRender.html_url} target="_blank">{this.state.repoToRender.name}</a></span>
                <div className="row">
                  <p className="left-align grey-text lighten-2 col s12">{this.state.repoToRender.description}</p>
                </div>
                <div className="row">
                  <strong className="left-align col s3"><span className="octicon octicon-history"></span> updated <TimeAgo date={this.state.repoToRender.updated_at} /></strong>
                  <strong className="center col s3"><span className="octicon octicon-issue-opened"></span> beginner tickets {this.state.repoToRender.beginner_tickets}</strong>
                  <strong className="center col s3"><span className="octicon octicon-git-branch"></span> forks {this.state.repoToRender.forks}</strong>
                  <div className="right-align col s3 mega-octicon octicon-thumbsup" onClick={ () => {this.favorRepo()} }>
                    <span className="green-text lighten-2 favorite">{favoritedText}</span>
                  </div>
                </div>
                <div className="row">
                  <strong className="left-align col s3"><span className="octicon octicon-calendar"></span> created <TimeAgo date={this.state.repoToRender.created_at} /></strong>
                  <strong className="center col s3"><span className="octicon octicon-git-pull-request"></span> last push <TimeAgo date={this.state.repoToRender.pushed_at} /></strong>
                  <strong className="center col s3"><span className="octicon octicon-eye"></span> watchers {this.state.repoToRender.watchers_count}</strong>
                </div>
                <div className="row">
                  <strong className="left-align col s3"><a className="cyan-text lighten-2" href={"http://www.github.com/" + this.state.repoToRender.org_name} target="_blank">{this.state.repoToRender.org_name}</a></strong>
                  <strong className="center col s3" ><a className="cyan-text lighten-2" href={this.state.repoToRender.html_url} target="_blank">repo on github</a></strong>
                  <strong className="center col s3" ><a className="cyan-text lighten-2" href={this.state.repoToRender.html_url+"/wiki"} target="_blank">wiki</a></strong>
                  <strong className="right-align col s3">{this.state.repoToRender.language || 'not specified'}</strong>
              </div>
                <div className="row">
                  <p className="left-align col s6"><strong>comments</strong>: {this.state.repoToRender.comments}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5>{this.state.repoToRender.beginner_tickets} beginner tickets</h5>
      <div className="main-ticket-view">
          {this.state.issues.map ((ticket, index) => 
            <TicketEntry data={ticket} key={index} />
          )}
      </div>
    </div>
    );
  }
}

module.exports = RepoProfile;