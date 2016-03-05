const React = require('react');
const PullSearch = require('./PullSearch');
const PullEntry = require('./PullEntry');

class PullList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (     
   	  <div >
        <PullSearch searchHandler={this.props.getFavedRepos} languages={this.props.languages} />
        <h4>You have {this.props.FavedRepos} pull requests</h4>
        <div className="main-pulls-view">
          {this.props.FavedRepos.map ((pull, index) => 
            <PullEntry data={pull} key={index} />
          )}
        </div>
      </div>
    )
  }
}

module.exports = PullList;