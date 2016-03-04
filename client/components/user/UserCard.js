const React = require('react');
const _ = require('lodash');
const User = require('../../js/users.js');

class UserCard extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
  	let user = this.props.user;
    user = _.each(user,(val, key) => {
        user[key] = val === null || val === "null" ? "" : val;
    });

    let logMeOut = () => {
      console.log("button fired");
      User.logout();
    };

    console.log(user);
  	return(
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
              <div className="row">
                <button href="/"className="waves-effect waves-teal btn-flat" onClick={logMeOut}>LOGOUT</button>
                <a href={user.url} className="right waves-effect waves-yellow btn-flat">Github</a>
              </div>
            </div>
          </div>
  	);
  }

}

module.exports = UserCard;