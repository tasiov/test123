const React = require('react');
const Link = require('react-router').Link;
const TimeAgo = require('../../../node_modules/react-timeago/timeago');


class RepoEntry extends React.Component {
  constructor (props) {
    super(props);
  }

  isFavorite() {
    return !!(this.props.favedRepos[this.props.data.id]);
  }

  favorRepo() {
    console.log('function called');
    if(!this.isFavorite()) {
      $.post('/api/favorite', this.props.data, (data) => {
        console.log('called to favorite');
        this.props.getFavedRepos();
      });
    }
  }


  render() {
    let favoritedText = this.isFavorite() ? 'Favorited' : 'Add to Favorites'
   
    return (
    <div className="row" id={this.props.data.id}>
        <div className="col s12 m10">
          <div className="card white">
            <div className="card-content black-text" >
                <span className="card-title">
                  <Link className="left cyan-text lighten-2" to={`/repoProfile/${this.props.data.id}`}>{this.props.data.name}
                  </Link>
                </span>
                <div className="row">
                  <p className="left-align grey-text lighten-2 col s12">{this.props.data.description}</p>
                </div>
                <div className="row">
                  <strong className="left-align col s3"><span className="octicon octicon-history"></span> updated <TimeAgo date={this.props.data.updated_at} /></strong>
                  <strong className="center col s3"><span className="octicon octicon-issue-opened"></span> beginner tickets {this.props.data.beginner_tickets}</strong>
                  <strong className="center col s3"><span className="octicon octicon-git-branch"></span> forks {this.props.data.forks}</strong>
                  <div className="right-align col s3 mega-octicon octicon-thumbsup" onClick={this.favorRepo.bind(this)}>
                    <span className="green-text lighten-2 favorite-entry">{favoritedText}</span>
                  </div>
                </div>
                <div className="row">
                  <strong className="left-align col s3"><a className="cyan-text lighten-2" href={"http://www.github.com/" + this.props.data.org_name} target="_blank">{this.props.data.org_name}</a></strong>
                  <strong className="center col s3" ><a className="cyan-text lighten-2" href={this.props.data.html_url} target="_blank">repo on github</a></strong>
                  <strong className="center col s3">{this.props.data.language || 'not specified'}</strong>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = RepoEntry;


