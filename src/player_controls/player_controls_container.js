import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import classNames from 'classnames';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';

class PlayerControlsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false
    };
  }

  togglePlay() {
    FirebaseRef.child('player/playing').set(!this.state.playing);
  }

  playNext() {
    FirebaseRef.child('player/next').set(true);
  }

  onPlayerChange(snapshot) {
    let val = snapshot.val();
    if(!_.isNull(val)) {
      this.setState({ playing: val });
    }
  }

  componentDidMount() {
    FirebaseRef.child('player/playing').on('value', this.onPlayerChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('player/playing').off('value', this.onPlayerChange.bind(this));
  }

  render() {

    let playPauseKlass = classNames('fa', {'fa-play': !this.state.playing, 'fa-pause': this.state.playing});

    return (
      <div>
        <ButtonGroup>
          <Button onClick={this.togglePlay.bind(this)}><i className={playPauseKlass} /></Button>
          <Button onClick={this.playNext.bind(this)}><i className="fa fa-step-forward" /></Button>
        </ButtonGroup>
        <Button bsStyle="link"><i className="fa fa-random" /></Button>
      </div>
    );
  }
};

export default PlayerControlsContainer;
