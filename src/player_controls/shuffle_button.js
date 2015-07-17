import React from 'react';
import FirebaseRef from 'firebase_ref';
import { Button } from 'react-bootstrap';

class ShuffleButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShuffle: false
    };
  }

  onShuffleChange(snapshot) {
    let val = snapshot.val();
    if(!_.isNull(val)) {
      this.setState({ isShuffle: val });
    }
  }

  handleClick() {
    FirebaseRef.child('playlist/shuffle').set(!this.state.isShuffle);
  }

  componentDidMount() {
    FirebaseRef.child('playlist/shuffle').on('value', this.onShuffleChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('playlist/shuffle').off('value', this.onShuffleChange.bind(this));
  }

  render() {
    return (
      <Button onClick={this.handleClick.bind(this)} bsStyle="link"><i className="fa fa-random" /></Button>
    );
  }
};

export default ShuffleButton;
