import React from 'react';
import Question from './question';
import { Button, Input } from 'react-bootstrap';

class Q5 extends Question {

  renderContinue() {
    if(!this.state.hasAnswered) { return false; }

    return (
      <div>
        <h2>Yeah!</h2>
        <p>
          All questions are answered! Lets continue and find out how you scored!
        </p>
        <div>
          <Button bsStyle="primary" onClick={this.props.upIndex}>Next question!</Button>
        </div>
      </div>
    );
  }

};

export default Q5;
