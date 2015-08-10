import React from 'react';
import _ from 'lodash';
import utils from 'utils';
import { Link } from 'react-router';
import { ContextMenuLayer } from "react-contextmenu";
import FirebaseRef from 'firebase_ref';
import classNames from 'classnames';

/**
 * Track item module
 * @module track/track_item
 */

class TrackItem extends React.Component {

  constructor(props) {
    super(props);
  }

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

  handleDoubleClick(e) {
    FirebaseRef.child('queue').push({uri: this.props.track.uri});
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
      cell = <td><Link tabIndex="-1" to='artist' params={{ id: track.artists[0].id }}>{track.artists[0].name}</Link></td>
    }
    return cell;
  }

  albumCell() {
    let cell = this.hiddenCell(),
        track = this.props.track;

    if(this.props.album) {
      cell = <td><Link tabIndex="-1" to='album' params={{ id: track.album.id }}>{track.album.name}</Link></td>;
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

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isCurrentTrack !== this.props.isCurrentTrack;
  }

  render() {

    let track = this.props.track,
        duration = utils.formatDuration(track.duration_ms),
        klass = classNames({ "current-track": this.props.isCurrentTrack });

    return (
      <tr tabIndex="0" onDoubleClick={this.handleDoubleClick.bind(this)} onKeyUp={this.handleKeyUp.bind(this)} className={klass}>
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

TrackItem.propTypes = {
  track: React.PropTypes.object.isRequired,
  index: React.PropTypes.number.isRequired
};

export default ContextMenuLayer("track", (props) => {
    return {
      spotifyUri: props.track.uri
    };
})(TrackItem);
