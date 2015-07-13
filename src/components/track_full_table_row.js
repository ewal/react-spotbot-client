import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import { Link } from 'react-router';

class Track extends React.Component {
  render() {

    let track = this.props.track;
    let duration = utils.formatDuration(track.duration_ms);

    return (
      <tr>
        <td>{track.track_number}.</td>
        <td>{track.name}</td>
        <td><Link to='album' params={{ id: track.album.id }}>{track.album.name}</Link></td>
        <td><Link to='artist' params={{ id: track.artists[0].id }}>{track.artists[0].name}</Link></td>
        <td>{duration}</td>
      </tr>
    );
  }
};

Track.propTypes = {
  track: React.PropTypes.object.isRequired
};

export default Track;
