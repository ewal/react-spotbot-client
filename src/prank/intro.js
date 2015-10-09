import React from 'react';
import { Button } from 'react-bootstrap';
import GSAP from 'react-gsap-enhancer';

class Intro extends React.Component {
  render() {
    return (
      <div className="intro">
        <h1>Oh, hello there, Mike</h1>
        <p>
          I would like to play a game. Do you like games, Mike?
        </p>
        <p>
          Don't try to refresh the browser, the game will start over.<br />
          There is no escape from this. Complete the game and I will return the player to your control.<br />
        </p>
        <p>
          You must answer five questions, each within a minute. Answer incorrectly and I'll raise the volume.<br />
          Are you ready to let the game begin?
        </p>
        <Button onClick={this.props.startGame} bsSize="lg">Let the game begin</Button>
      </div>
    );
  }
};

export default Intro;
