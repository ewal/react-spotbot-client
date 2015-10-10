import React from 'react';
import Question from './question';
import { Button, Input } from 'react-bootstrap';

class Q2 extends Question {

  renderContinue() {
    if(!this.state.hasAnswered) { return false; }

    return (
      <div>
        <h2>Wohoo</h2>
        <p>
          Man isn't this fun? Take a look at this picture.
          Aren't they having fun together?
          They are probably on their way to see Toto somewhere!
          Don't you wanna be apart of this picture, Mike?
        </p>
        <p>
          <img src="/images/Happy-People1.jpg" />
        </p>
        <div>
          <Button bsStyle="primary" onClick={this.props.upIndex}>Next question!</Button>
        </div>
      </div>
    );
  }

};

export default Q2;
