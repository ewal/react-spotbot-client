import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import classNames from 'classnames';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import ShuffleButton from 'player_controls/shuffle_button';
import VolumeControl from 'player_controls/volume_control';
import FullscreenToggle from 'components/fullscreen_toggle';

/**
 * Player controls container module
 * @module player_controls/player_controls_container
 */

class PlayerControlsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.ref = null;
    this.state = {
      playing: false
    };
  }

  componentDidMount() {
    this.ref = FirebaseRef.child('player/playing').on('value', (snapshot) => {
      let val = snapshot.val();
      if(!_.isNull(val)) {
        this.setState({ playing: val });
      }
    });
  }

  componentWillUnmount() {
    FirebaseRef.child('player/playing').off('value', this.ref);
  }

  togglePlay() {
    FirebaseRef.child('player/playing').set(!this.state.playing);
  }

  playNext() {
    FirebaseRef.child('player/next').set(true);
  }

  render() {

    let playPauseKlass = classNames('fa', {'fa-play': !this.state.playing, 'fa-pause': this.state.playing});

    return (
      <div>
        <ButtonGroup>
          <Button onClick={this.togglePlay.bind(this)} bsStyle="primary" className="play"><i className={playPauseKlass} /></Button>
          <Button onClick={this.playNext.bind(this)} bsStyle="default" className="pause"><i className="fa fa-step-forward" /></Button>
        </ButtonGroup>
        <ShuffleButton />
        <FullscreenToggle toggleFullscreen={this.props.toggleFullscreen}  />
        <VolumeControl />
      </div>
    );
  }
};

export default PlayerControlsContainer;
