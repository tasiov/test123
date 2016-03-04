const React = require('react');
const UserCard = require('./UserCard.js');
const UserRepoList = require('./UserFavoriteList.js');

class UserProfile extends React.Component {
  
  constructor(props) {
    super(props);
  }

   componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the ticket list
    $('.main-user-profile')[0].scrollTop = 0;
  }
 	
  render() {
  	let user = this.props.user;
    return (
      <div className="row main-user-profile">
        <div className="col s12 m7">
          <UserCard user={this.props.user}/>
        </div>
        <div className="col s12 m5">
          <UserRepoList favorites={this.props.favedRepos}/>
        </div>
      </div>
    )
  }
}

module.exports = UserProfile;
