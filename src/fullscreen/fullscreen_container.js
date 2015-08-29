import React from 'react';
import CurrentTrackStore from '_stores/current_track_store';
import BackgroundImage from 'components/background_image';
import _ from 'lodash';
import utils from 'utils';

class FullscreenContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      track: {}
    };
  }

  componentDidMount() {
    this.unsubscribe = CurrentTrackStore.listen(() => {
      this.setState({
        isPlaying: CurrentTrackStore.get().isPlaying,
        startedAt: CurrentTrackStore.get().startedAt,
        track: CurrentTrackStore.getTrack()
      });
    });

    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
    console.log("unmount");
  }

  handleKeyUp(e) {
    if(e.which === 27) {
      this.props.toggleFullscreen();
    }
  }

  render() {

    if(_.isEmpty(this.state.track) || !this.props.showFullscreen) { return false; }
    let track = this.state.track,
        duration = utils.formatDuration(track.duration_ms);

    let style = {
      backgroundImage: 'url(' + track.album.images[0].url + ')',
      backgroundSize: 'cover'
    };

    return (
      <div className="fullscreen-container">
        <div className="cover" style={style} />
        <div className="media">
          <div className="media-left media-middle">
            <BackgroundImage image={track.album.images[1]} classNames="bg-image media-object" />
          </div>
          <div className="media-body">
            <h1 className="media-heading">{track.name} <br />{duration}</h1>
            <p>{track.artists[0].name}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default FullscreenContainer;
