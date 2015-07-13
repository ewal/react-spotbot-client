import React from 'react';
import _ from 'lodash';
import utils from 'utils';

class Track extends React.Component {
  render() {

    let track = this.props.track;
    let duration = utils.formatDuration(track.duration_ms);

    return (
      <tr>
        <td>{track.track_number}.</td>
        <td>{track.name}</td>
        <td>{duration}</td>
      </tr>
    );
  }
};

Track.propTypes = {
  track: React.PropTypes.object.isRequired
};

export default Track;
