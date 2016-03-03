const React = require('react');
const FavoriteEntry = require('./UserFavoriteEntry');

class UserFavoriteList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the ticket list
    $('.main-favorite-view')[0].scrollTop = 0;
  }

  render() {
  	
  	return(
      <div className="main-favorite-view">
        <ul className="collection with header">
          <li className="collection-header">
            <h4>My Favorite Repos</h4>
          </li>
          {this.props.favorites.map ((repo, index) => (
              <FavoriteEntry data={repo} key={index} />
            )
          )}
        </ul>
      </div>
  	);
  }

}

module.exports = UserFavoriteList;