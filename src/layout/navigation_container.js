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
      <div>
        <header>
          <h2>Main</h2>
        </header>
        <section>
          <Nav stacked bsStyle="pills">
            <NavItemLink to='playlist'>
              <i className="fa fa-headphones" />
              Playlist
            </NavItemLink>
            <NavItemLink to='queue'>
              <i className="fa fa-bars" />
              Queue
              <Badge className="pull-right">{this.state.queueSize}</Badge>
            </NavItemLink>
          </Nav>
        </section>
      </div>
    );
  }
};

export default NavigationContainer;
