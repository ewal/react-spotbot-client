import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import { Link } from 'react-router';
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

  hiddenCell() {
    return <td className="hide" />;
  }

  // TODO: Use same approach as album image. Use a background image instead.
  imageCell() {
    let cell = this.hiddenCell(),
        track = this.props.track;

    if(!_.isUndefined(track.album) && this.props.image) {
      let url = _.isUndefined(track.album.images[2]) ? '#' : track.album.images[2].url;
      let style = {
        backgroundImage: 'url(' + url + ')',
        backgroundSize: '40px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      };
      cell = <td className="image-cell" style={style}></td>;
    }
    return cell;
  }

  artistCell() {
    let cell = this.hiddenCell(),
        track = this.props.track;

    if(this.props.artist) {
      cell = <td><Link to='artist' params={{ id: track.artists[0].id }}>{track.artists[0].name}</Link></td>
    }
    return cell;
  }

  albumCell() {
    let cell = this.hiddenCell(),
        track = this.props.track;

    if(this.props.album) {
      cell = <td><Link to='album' params={{ id: track.album.id }}>{track.album.name}</Link></td>;
    }
    return cell;
  }

  indexCell() {
    let cell = this.hiddenCell();
    if(!_.isUndefined(this.props.index)) {
      cell = <td className="track-number">{this.props.index+1}.</td>;
    }
    return cell;
  }

  render() {

    let track = this.props.track;
    let duration = utils.formatDuration(track.duration_ms);

    return (
      <tr tabIndex="0" onKeyUp={this.handleKeyUp.bind(this)}>
        {this.imageCell()}
        {this.indexCell()}
        <td>{track.name}</td>
        {this.albumCell()}
        {this.artistCell()}
        <td className="duration">{duration}</td>
      </tr>
    );
  }
};

Track.propTypes = {
  track: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired
};

export default ContextMenuLayer("track", (props) => {
    return {
      spotifyUri: props.track.uri
    };
})(Track);
