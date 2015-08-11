import React from 'react';
import { Button } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';

class StarPlaylistItem extends React.Component {

  handleClick() {
    let uri = this.props.playlist.uri;
    FirebaseRef.child('playlist/uri').set(uri);
    FirebaseRef.child('player/next').set(true);
  }

  render() {
    let playlist = this.props.playlist;
    return (
      <li>
        <Button bsStyle="link" onClick={this.handleClick.bind(this)}>
          {playlist.name}
        </Button>
      </li>
    );
  }
};

export default StarPlaylistItem;
