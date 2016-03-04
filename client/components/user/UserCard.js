const React = require('react');
const _ = require('lodash');

class UserCard extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
  	let user = this.props.user;
    user = _.each(user,(val, key) => {
        user[key] = val === null || val === "null" ? "" : val;
    });

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
              <a href={user.url}>Github</a>
            </div>
          </div>
  	);
  }

}

module.exports = UserCard;