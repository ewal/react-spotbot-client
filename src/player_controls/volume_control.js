import React from 'react';
import _ from 'lodash';
import FirebaseRef from 'firebase_ref';

/**
 * Volume control module
 * @module player_controls/volume_control
 */

class VolumeControl extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      volume: -1
    };

    this.changeVolume = _.debounce(() => {
      let volume = _.parseInt(React.findDOMNode(this.refs.inputRange).value);
      FirebaseRef.child('volume').set(volume);
    }, 200);
  }

  onVolumeChange(snapshot) {
    let val = snapshot.val();
    this.setState({ volume: val });
  }

  componentDidMount() {
    FirebaseRef.child('volume').on('value', this.onVolumeChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('volume').off('value', this.onVolumeChange.bind(this));
  }

  render() {

    if(this.state.volume === -1) { return false; }

    let volumeProps = {
      onClick: this.changeVolume.bind(this),
      onChange: this.changeVolume.bind(this),
      defaultValue: this.state.volume,
      ref: 'inputRange',
      type: 'range',
      step: 2,
      min: 0,
      max: 100
    };

    return (
      <div className="volume-control">
        <input {...volumeProps} />
      </div>
    );
  }
};

export default VolumeControl;
