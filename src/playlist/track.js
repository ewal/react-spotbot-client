import React from 'react';
import _ from 'lodash';

class Track extends React.Component {
  render() {

    let track = this.props.track;

    return (
      <tr>
        <td>{track.track_number}.</td>
        <td>{track.name}</td>
        <td>{track.album.name}</td>
        <td>{track.artists[0].name}</td>
      </tr>
    );
  }
};

export default Track;
