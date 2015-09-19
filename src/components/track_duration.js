import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import utils from 'utils';

class TrackDuration extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      elapsed: 0
    };
  }

  componentDidMount() {
    if(this.props.isPlaying) {
      this.timer = setInterval(this.tick.bind(this), 1000);
    }
    else {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ elapsed: (Date.now() - this.props.startedAt) });
  }

  render() {
    if(_.isUndefined(this.props.currentTrack)) { return false; }

    let percent = (this.state.elapsed / this.props.currentTrack.duration_ms) * 100;
    return (
      <ProgressBar now={percent} label="%(percent)s%" srOnly />
    );
  }
};

TrackDuration.propTypes = {
  currentTrack: React.PropTypes.object.isRequired,
  startedAt: React.PropTypes.number.isRequired,
  isPlaying: React.PropTypes.bool.isRequired
};

export default TrackDuration;
