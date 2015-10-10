import React from 'react';
import Question from './question';
import { Button, Input } from 'react-bootstrap';

class Q3 extends Question {

  renderContinue() {
    if(!this.state.hasAnswered) { return false; }

    return (
      <div>
        <h2>Halfway through!</h2>
        <p>
          I'm so excited for you!
        </p>
        <div>
          <Button bsStyle="primary" onClick={this.props.upIndex}>Next question!</Button>
        </div>
      </div>
    );
  }

};

export default Q3;
