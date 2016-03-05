const React = require('react');
const Favs = require('../../js/favedRepos.js');


class UserFavoriteList extends React.Component {
  
  constructor(props) {
    super(props);
    var unFavorite = () => {
      Materialize.toast(this.props.name + " was removed!", 4000)
      Favs.deleteFavedRepoFromApi(this.props.id);
      this.icon = (<i className="material-icons right">loyalty</i>);
      this.render();
    }
    this.icon = (<a><i className="material-icons right" onClick={unFavorite}>loyalty</i></a>)
  }

  render() {

    
  	return(
      <li className="user-favorite-entry">
        <div className="collapsible-header">
          <span>{this.props.data.name}</span>
          {this.icon}
        </div>
        <div className="collapsible-body">
          <p> {this.props.data.org_name}<br/>
          {this.props.data.description}<br/>
          <a href={this.props.data.html_url}>GITHUB</a>
          </p>
        </div>
      </li>
  	);
  }

}

module.exports = UserFavoriteList;