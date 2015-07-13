import React from 'react';

// TODO:
// Queue item onKeyUp = q
// Play item onKeyUp = p
class TrackListItem extends React.Component {

  handleKeyUp(e) {
    console.log(e.which);
  }

  render() {
    let track = this.props.track;
    return (
      <li onKeyUp={this.handleKeyUp.bind(this)} tabIndex="0">
        {track.name}
      </li>
    );
  }
};

TrackListItem.propTypes = {
  track: React.PropTypes.object.isRequired
};

export default TrackListItem;
