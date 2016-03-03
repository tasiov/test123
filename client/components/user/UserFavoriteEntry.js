const React = require('react');

class UserFavoriteList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
  	
  	return(
      <li className="collection-item avatar">
        <span className="title">
          {this.props.data.name}
        </span>
        <p> {this.props.data.org_name}<br/>
           {this.props.data.descrption}<br/>
           <a href={this.props.data.html_url}>GITHUB</a>
        </p>
        <a href="#!" className="secondary-content"><i className="material-icons">loyalty</i></a>
      </li>
  	);
  }

}

module.exports = UserFavoriteList;