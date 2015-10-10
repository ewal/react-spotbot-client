import React from 'react';
import Question from './question';
import { Button, Input } from 'react-bootstrap';

class Q1 extends Question {

  renderContinue() {
    if(!this.state.hasAnswered) { return false; }

    return (
      <div>
        <h2>First question done!</h2>
        <p>
          The trip has jsut begun!
        </p>
        <div>
          <Button bsStyle="primary" onClick={this.props.upIndex}>Next question!</Button>
        </div>
      </div>
    );
  }

};

export default Q1;
