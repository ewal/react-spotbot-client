import React from 'react';
import FirebaseRef from 'firebase_ref';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

class ShuffleButton extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
    this.state = {
      isShuffle: false
    };
  }

  componentDidMount() {
    this.ref = FirebaseRef.child('playlist/shuffle').on('value', (snapshot) => {
      let val = snapshot.val();
      if(!_.isNull(val)) {
        this.setState({ isShuffle: val });
      }
    });
  }

  componentWillUnmount() {
    FirebaseRef.child('playlist/shuffle').off('value', this.ref);
  }

  handleClick() {
    FirebaseRef.child('playlist/shuffle').set(!this.state.isShuffle);
  }

  render() {

    let klass = classNames('shuffle', { 'active': this.state.isShuffle });
    let title = '';
    if(this.state.isShuffle) {
      title = 'Shuffle off';
    }
    else { title = 'Shuffle on'; }

    return (
      <Button onClick={this.handleClick.bind(this)} bsStyle="link" className={klass}><i className="fa fa-random" /></Button>
    );
  }
};

export default ShuffleButton;
