import React from 'react';
import { Nav, Badge } from 'react-bootstrap';
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

  render() {
    return (
      <Nav stacked bsStyle="pills">
        <NavItemLink to='playlist'>Playlist</NavItemLink>
        <NavItemLink to='queue'>Queue <Badge className="pull-right">{this.state.queueSize}</Badge></NavItemLink>
      </Nav>
    );
  }
};

export default NavigationContainer;
