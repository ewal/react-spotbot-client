import React from 'react';
import FirebaseRef from 'firebase_ref';
import { ContextMenu, MenuItem } from "react-contextmenu";

class ContextMenuTrack extends React.Component {

  playTrack(data) {
    FirebaseRef.child('player/current_track/uri').set(data.spotifyUri);
  }

  queueTrack(data) {
    FirebaseRef.child('queue').push({uri: data.spotifyUri});
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
