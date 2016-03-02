const React = require('react');
 
class UserProfile extends React.Component {
  
  constructor(props) {
    super(props);
  }

   componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the ticket list
    $('.main-ticket-view')[0].scrollTop = 0;
  }

  render() {
    return (
      <div>
      	<h4>My Profile</h4>
      	<div className="main-user-profile">
	      	<span>{JSON.stringify(this.props.user)}</span>
	    </div>
      </div>
    )
  }
}

module.exports = UserProfile;
