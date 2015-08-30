import React from 'react';
import CurrentTrackStore from '_stores/current_track_store';
import BackgroundImage from 'components/background_image';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import utils from 'utils';

class FullscreenContainer extends React.Component {

  constructor(props) {
    super(props);
    this.ref = null;

    this.state = {
      track: {},
      playing: false
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

    this.ref = FirebaseRef.child('player/playing').on('value', (snapshot) => {
      let val = snapshot.val();
      if(!_.isNull(val)) {
        this.setState({ playing: val });
      }
    });

    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
    FirebaseRef.child('player/playing').off('value', this.ref);
    window.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyUp(e) {
    if(!this.props.showFullscreen) { return; }
    switch(e.which) {
      case 27: this.props.toggleFullscreen();
      break;
      case 32: FirebaseRef.child('player/playing').set(!this.state.playing)
      break;
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
