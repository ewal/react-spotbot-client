import React from 'react';
import utils from 'utils';
import { Link } from 'react-router';
import CurrentTrackStore from '_stores/current_track_store';

class CurrentTrackContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      track: {}
    };
  }

  componentDidMount() {
    this.unsubscribe = CurrentTrackStore.listen(this.onTrackChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onTrackChange() {
    this.setState({ track: CurrentTrackStore.get() });
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
