import React from 'react';
import { Button } from 'react-bootstrap';

class Outro extends React.Component {
  render() {
    console.log(this.props.answers);
    return (
      <div>
        <h1>You are done!</h1>
        <p>
          This is your score:
        </p>
        <p>
          Too bad! You didn't successfully answer all the questions :(
          I can't let you leave until you have answered everything correctly.
        </p>
        <p>
          <Button onClick={this.props.resetGame}>Start over</Button>
        </p>
      </div>
    );
  }
};

export default Outro;
