import React from 'react';
import utils from 'utils';
import { Link } from 'react-router';
import FirebaseRef from 'firebase_ref';
import TrackMetadataApi from '_apis/track_metadata_api';

class CurrentTrackContainer extends React.Component {

  constructor(props) {
    super(props);

    this.ref = null;
    this.state = {
      track: {}
    };
  }

  componentDidMount() {
    this.ref = FirebaseRef.child('player/current_track').on('value', (snapshot) => {
      let val = snapshot.val();
      let trackId = utils.spotify.parseId(val.uri);
      TrackMetadataApi.track(trackId)
      .then((response) => {
        // TODO: what's the problem here?
        // Suspect spotbot server is doint something,
        // Sometimes we get an array, sometimes an object
        if(_.isArray(response.tracks)) {
          this.setState({ track: response.tracks[0] });
        }
        else {
          this.setState({ track: response });
        }
      })
      .catch((message) => {
        throw new Error(message);
      });
    });
  }

  componentWillUnmount() {
    FirebaseRef.child('player/current_track').off('value', this.ref);
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
