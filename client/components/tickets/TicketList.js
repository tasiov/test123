const React = require('react');
const TicketSearch = require('./TicketSearch');
const TicketEntry = require('./ticketEntry');


class TicketList extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the ticket list
    $('.main-ticket-view')[0].scrollTop = 0;
  }
  render () {
    
    //for really clean scrolling, we could do something like below to calculate the max height and then set the max height css 
    // var maxHeight = $(window).height() - $('.navbar').outerHeight() - margin * 2;
    
    return (
    <div>
      <TicketSearch searchHandler={this.props.getIssues} languages={this.props.languages} />
      <h4>{this.props.numberOfTickets} beginner tickets on github</h4>
      <blockquote>labeled on github as easy, beginner, good first bug, etc.
      </blockquote>
      <div className="main-ticket-view">
          {this.props.ticketsToRender.map ((ticket, index) => (
              <TicketEntry data={ticket} key={index} />
            )
          )}
      </div>
    </div>
    );  
  }
  
}

module.exports = TicketList;