const React = require('react');
 
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
          <div className="card">
            <div className="card-image">
              <img src={user.avatar_url}/>
              <h3 className="card-title">

              	<p>{user.name}</p>
              	<div className="chip">
              	  Lv.{user.game_level}
              	</div>
              	<div className="chip">
              	  <i className="material-icons">done</i>
              	  {user.game_tickets_completed}
              	</div>

              </h3>
            </div>
            <div className="card-content">
              <p>{`${user.company}, ${user.location}`}</p>
              <p>{user.email}</p>
              <p>{user.bio}</p>
            </div>
            <div className="card-action">
              <a href={user.url}>Github</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = UserProfile;
