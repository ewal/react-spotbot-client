import React from 'react';
import FirebaseRef from 'firebase_ref';
import TrackMetadataApi from '_apis/track_metadata_api';
import utils from 'utils';
import { Link } from 'react-router';

class CurrentTrackContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      track: {}
    };
  }

  onSetTrack(snapshot) {
    let trackId = utils.spotify.parseId(snapshot.val().uri);
    if(!_.isNull(trackId)) {
      TrackMetadataApi.track(trackId).then((response) => {
        if(!_.isEmpty(response)) {
          this.setState({
            track: response
          });
        }
      }).catch((message) => {
        throw new Error(message);
      });
    }
  }

  componentDidMount() {
    FirebaseRef.child('player/current_track').on('value', this.onSetTrack.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('player/current_track').off('value', this.onSetTrack.bind(this));
  }

  render() {
    if(_.isEmpty(this.state.track)) { return false; }

    let track = this.state.track,
        duration = utils.formatDuration(track.duration_ms);

    return (
      <div className="current-track-container">
        <div className="thumbnail">
          <img src={track.album.images[1].url} />
        </div>
        <h2>{track.name}</h2>
        <h3 className="duration">{duration}</h3>
        <p>
          <Link to="album" params={{ id: track.album.id }}>{track.album.name}</Link> / <Link to="artist" params={{ id: track.artists[0].id }}>{track.artists[0].name}</Link>
        </p>
      </div>
    );
  }
};

export default CurrentTrackContainer;
