const React = require('react');
const Favs = require('../../js/favedRepos.js');


class UserFavoriteList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    let iconColor = "green";
    let unFavorite = () => {
      Materialize.toast(this.props.name + " was removed!", 4000)
      Favs.deleteFavedRepoFromApi(this.props.id);
      iconColor = "grey";
    }

  	
  	return(
      <li className="user-favorite-entry">
        <div className="collapsible-header">
          <span>{this.props.data.name}</span>
          <a href="#!" className="right" onClick=""><i className="material-icons {iconColor}">loyalty</i></a>
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