import React from 'react';
import { Button } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';

class Outro extends React.Component {

  constructor(props) {
    super(props);

    this.replies = [
      "I am deeply insulted. Start over and try harder!",
      "One correct answers?? You gotta be shitting me! Do it again!",
      "This wont simply do ... try harder!",
      "More than half of them right... close but no cigarr!",
      "Four! Four is not bad! Which one did you miss?",
      "Wow! You did it! You are simply amazing. I bet you feel just awesome right now! Now, go tell your friends what you have learned!"
    ];

    this.gifs = [
      "face_plant.gif",
      "seriously.gif",
      "try_harder.gif",
      "ice_bath.gif",
      "boy_ball.gif",
      "little_mac.gif"
    ];
  }

  componentDidMount() {
    if(this.props.correctAnswers === 5) {
      FirebaseRef.child('player/current_track/uri').set("spotify:track:4hszow3YBRAbGGA0WbbR6r");
    }
    else {
      FirebaseRef.child('player/playing').set(false);
    }
  }

  renderButton() {
    if(this.props.correctAnswers === 5) {
        return (
          <Button onClick={this.props.resetGame}>Get out of here</Button>
        );
    }
    else {
      return (
        <Button onClick={this.props.resetGame}>Start over</Button>
      );
    }
  }

  render() {

    return (
      <div className="card">
        <div className="card-inner">
          <h1>You are done!</h1>
          <p>
            You scored {this.props.correctAnswers} out of 5.
          </p>
          <p>
            {this.replies[this.props.correctAnswers]}
          </p>
          <p>
            <img src={"/images/replies/" + this.gifs[this.props.correctAnswers]} />
          </p>
          <p>
            {this.renderButton()}
          </p>
        </div>
      </div>
    );
  }
};

export default Outro;
