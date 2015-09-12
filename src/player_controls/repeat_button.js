import React from 'react';
import FirebaseRef from 'firebase_ref';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

class RepeatButton extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;
    this.state = {
      isRepeat: false
    };

  }

  componentDidMount() {
    this.ref = FirebaseRef.child('playlist/repeat').on('value', (snapshot) => {
      let val = snapshot.val();
      if(!_.isNull(val)) {
        this.setState({ isRepeat: val });
      }
    });

  }

  componentWillUnmount() {
    FirebaseRef.child('playlist/repeat').off('value', this.ref);
  }

  handleClick() {
    FirebaseRef.child('playlist/repeat').set(!this.state.isRepeat);
  }

  render() {

    let klass = classNames('repeat', { 'active': this.state.isRepeat });

    return (
      <Button onClick={this.handleClick.bind(this)} bsStyle="link" className={klass}><i className="fa fa-retweet" /></Button>
    );
  }
};

export default RepeatButton;
