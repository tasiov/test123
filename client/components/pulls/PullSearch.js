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
    let searchHandler = (e) => {
      if (e.charCode === 13 || e.keyCode === 13) {
        let $selected = $('.pulls-language-dropdown').find('.selected');
        let language = $selected[0] ? $selected[0].innerText.trim() : '';
        this.props.searchHandler(e.target.value, language);
      }
    }

    return (
      <div className="row">
        <div className="input-field col s8">
          <input type="text" placeholder="search here..." onKeyPress={searchHandler} />
        </div>
        <div className="input-field col s2">
          <select className='pulls-language-dropdown' defaultValue='Select a Language...'>
            <option value='Select a Language' key={this.props.languages.length}>Select A Language...</option>
            {this.props.languages.map((lang, index) => <option value={lang} key={lang}>{lang}</option>)}
          </select>
        </div>
      </div>
    );



  }
}

  module.exports = PullSearch;