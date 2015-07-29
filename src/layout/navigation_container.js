import React from 'react';
import { Nav, Badge, Button } from 'react-bootstrap';
import ReactRouterBootstrap from 'react-router-bootstrap';
import FirebaseRef from 'firebase_ref';

let NavItemLink = ReactRouterBootstrap.NavItemLink;

class NavigationContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      queueSize: 0
    };
  }

  onQueueChange(snapshot) {
    let val = _.toArray(snapshot.val());
    this.setState({ queueSize: val.length });
  }

  componentDidMount() {
    FirebaseRef.child('queue').on('value', this.onQueueChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('queue').off('value', this.onQueueChange.bind(this));
  }

  handleClick() {
    console.log("hej");
  }

  render() {
    return (
      <Nav onClick={this.props.hideSearchContainer} stacked bsStyle="pills">
        <Button bsStyle="link" onClick={this.props.toggleSearch}>
          <i className="fa fa-search" />
          <span className="sr-only">Search</span>
        </Button>
        <NavItemLink to='playlist'>
          <i className="fa fa-headphones" />
          <span className="sr-only">Playlist</span>
        </NavItemLink>
        <NavItemLink to='queue'>
          <i className="fa fa-bars" />
          <span className="sr-only">Queue</span>
          <Badge title="Songs in queue" className="in-queue">{this.state.queueSize}</Badge>
        </NavItemLink>
        <NavItemLink to='starred' className="hide">
          <span className="sr-only">Starred</span>
          <i className="fa fa-star" />
        </NavItemLink>
      </Nav>
    );
  }
};

export default NavigationContainer;
