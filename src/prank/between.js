import React from 'react';
import FirebaseRef from 'firebase_ref';

class Between extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      time: 3
    };

    this.timer = null;
  }

  componentDidMount() {
    FirebaseRef.child('player/playing').set(false);
    this.timer = setInterval(() => {
      let time = this.state.time -1;
      if(time === 0) {
        this.props.upIndex();
      }
      else {
        this.setState({ time: time });
      }
    }, 700);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="card between">
        <div className="card-inner">
          <h1>Get ready!</h1>
          <h1>{this.state.time}</h1>
        </div>
      </div>
    );
  }
};

export default Between;
