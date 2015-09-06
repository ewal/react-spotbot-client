import React from 'react';
import { Nav, Badge, Button } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';

class NavigationContainer extends React.Component {

  constructor(props) {
    super(props);

    this.ref = null;
    this.state = {
      queueSize: 0
    };
  }

  componentDidMount() {
   this.ref = FirebaseRef.child('queue').on('value', (snapshot) => {
      let val = snapshot.val();
      if(_.isNull(val)) {
        this.setState({ queueSize: 0 });
      }
      else {
        this.setState({ queueSize: _.toArray(val).length });
      }
   });
  }

  componentWillUnmount() {
    FirebaseRef.child('queue').off('value', this.ref);
  }

  handleToggleSearch(e) {
    e.preventDefault();
    this.props.toggleSearch();
  }

  render() {
    return (
      <div>
        <Nav onClick={this.props.hideSearchContainer} stacked bsStyle="pills">
          <NavItemLink to="search" params={{ query: "" }} onClick={this.handleToggleSearch.bind(this)}>
            <i className="fa fa-search" />
            <span className="sr-only">Search</span>
          </NavItemLink>
          <NavItemLink to="playlist">
            <i className="fa fa-headphones" />
            <span className="sr-only">Playlist</span>
          </NavItemLink>
          <NavItemLink to="queue">
            <i className="fa fa-bars" />
            <span className="sr-only">Queue</span>
            <Badge title="Songs in queue" className="in-queue">{this.state.queueSize}</Badge>
          </NavItemLink>
          <NavItemLink to="starred">
            <span className="sr-only">Starred</span>
            <i className="fa fa-star" />
          </NavItemLink>
        </Nav>
      </div>
    );
  }
};

export default NavigationContainer;
