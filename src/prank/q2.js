import React from 'react/addons';
import Question from './question';
import { Button, Input } from 'react-bootstrap';

class Q2 extends Question {

  renderContinue() {
    if(!this.state.hasAnswered) { return false; }

    return (
      <div>
        <h2>Wohoo!</h2>
        <p>
          Man isn't this fun? Take a look at this picture with this healty group of people.
          Aren't they having fun together?
          They are probably on their way to see Toto somewhere!
          Don't you wanna have fun with other poeple like these?
          You could be in this picture, Mike!
        </p>
        <div>
          <Button bsStyle="primary" onClick={this.props.upIndex}>Next question!</Button>
        </div>
      </div>
    );
  }

};

export default Q2;
