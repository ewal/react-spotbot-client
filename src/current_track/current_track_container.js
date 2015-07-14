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
      TrackMetadataApi.fetchTrack(trackId).then((response) => {
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
      <div className="media">
        <div className="media-left">
          <img className="media-object" src={track.album.images[2].url} alt="..." />
        </div>
        <div className="media-body">
          <h5 className="media-heading">
            {track.name} {duration}
          </h5>
          <Link to="album" params={{ id: track.album.id }}>{track.album.name}</Link> / <Link to="artist" params={{ id: track.artists[0].id }}>{track.artists[0].name}</Link>
        </div>
      </div>
    );
  }
};

export default CurrentTrackContainer;
