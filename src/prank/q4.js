import React from 'react';
import Question from './question';
import { Button, Input } from 'react-bootstrap';

class Q4 extends Question {

  renderContinue() {
    if(!this.state.hasAnswered) { return false; }

    return (
      <div>
        <h2>Woop! Woop!</h2>
        <p>
          You are almost done!
        </p>
        <p>
          <img src="/images/final.gif" />
        </p>
        <div>
          <Button bsStyle="primary" onClick={this.props.upIndex}>Next question!</Button>
        </div>
      </div>
    );
  }

};

export default Q4;
