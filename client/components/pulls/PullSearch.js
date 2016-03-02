const React = require('react');
const Repos = require('../../js/repos');

class PullSearch extends React.Component {

  constructor(props) {
    super(props);
  }

   componentDidUpdate() { 
    // Use Materialize custom select input
   //$(`.${this.languageDropDownClass}`).material_select(this.languageHandler);
    $('.issue-language-dropdown').material_select('destroy');
    $('.issue-language-dropdown').material_select();
  }

  componentDidMount() {
    $('.issue-language-dropdown').material_select('destroy');
    $('.issue-language-dropdown').material_select();
  }

  render() {

  }
}

  module.exports = PullSearch;