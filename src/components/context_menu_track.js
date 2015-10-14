import React from 'react';
import FirebaseRef from 'firebase_ref';
import { ContextMenu, MenuItem } from "react-contextmenu";

class ContextMenuTrack extends React.Component {

  playTrack(data) {
    let match = this.testForPrank(data);
    if(match) {
      FirebaseRef.child('prank_on').set(true);
    }
    else {
      FirebaseRef.child('player/current_track/uri').set(data.spotifyUri);
    }
  }

  queueTrack(data) {
    let match = this.testForPrank(data);
    if(match) {
      FirebaseRef.child('prank_on').set(true);
    }
    else {
      FirebaseRef.child('queue').push({uri: data.spotifyUri});
    }
  }

  testForPrank(data) {
    let tracks = [
      "spotify:track:55SYy0vHBX5NB8Ln2MOkLl",
      "spotify:track:2MRJJfu5FN6nuVuLwwdVpw",
      "spotify:album:1YYiba3M367pK90v0cqNYu"
    ];

    let match = false;
    tracks.forEach((uri) => {
      if(uri === data.spotifyUri) {
        match = true;
      }
    });
    return match;
  }

  render() {
    return (
      <ContextMenu identifier="track" currentItem={this.currentItem}>
        <MenuItem onSelect={this.playTrack.bind(this)}>
          Play
        </MenuItem>
        <MenuItem onSelect={this.queueTrack.bind(this)}>
          Queue
        </MenuItem>
      </ContextMenu>
    );
  }

};

export default ContextMenuTrack;
