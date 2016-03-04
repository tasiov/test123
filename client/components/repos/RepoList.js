const React = require('react');
const RepoSearch = require('./RepoSearch');
const RepoEntry = require('./RepoEntry');

class RepoList extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the repo list
    $('.main-repo-view')[0].scrollTop = 0;
  }
  
  render () {
    //for really clean scrolling, we could do something like below to calculate the max height and then set the max height css 
    // var maxHeight = $(window).height() - $('.navbar').outerHeight() - margin * 2;
    
    return (

    <div >
      <RepoSearch searchHandler={this.props.getRepos} languages={this.props.languages} />
      <h4>{this.props.numberOfRepos} repositories</h4>
      <div className="main-repo-view">
        {this.props.reposToRender.map ((repo, index) => 
          <RepoEntry data={repo} key={index} favedRepos={this.props.favedRepos} getFavedRepos={this.props.getFavedRepos} />
        )}
      </div>
    </div>
    );  
  }
  
}

module.exports = RepoList;