import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import { ContextMenuLayer } from "react-contextmenu";
import FirebaseRef from 'firebase_ref';

class Track extends React.Component {

  handleKeyUp(e) {
    switch(e.which) {
      case 81:
        FirebaseRef.child('queue').push({uri: this.props.track.uri});
      break;
      case 80:
        FirebaseRef.child('player/current_track/uri').set(this.props.track.uri);
      break;
      default: return;
    }
  }

  render() {

    let track = this.props.track;
    let duration = utils.formatDuration(track.duration_ms);
    let imageCell = <td className="hide"></td>;
    if(!_.isUndefined(track.album)) {
        imageCell = <td className="image-cell"><img src={track.album.images[2].url} /></td>;
    }

    return (
      <tr tabIndex="0" onKeyUp={this.handleKeyUp.bind(this)}>
        {imageCell}
        <td className="track-number">{track.track_number}.</td>
        <td>{track.name}</td>
        <td className="duration">{duration}</td>
      </tr>
    );
  }
};

Track.propTypes = {
  track: React.PropTypes.object.isRequired
};

export default ContextMenuLayer("track", (props) => {
    return {
      spotifyUri: props.track.uri
    };
})(Track);
