const React = require('react');
const Link = require('react-router').Link;

class PullEntry extends React.Component {
  constructor (props) {
  	super(props)
  }

  render(){
  	return <p>{json.stringify(this.props.data)}</p>
  }
 }


module.exports = PullEntry;