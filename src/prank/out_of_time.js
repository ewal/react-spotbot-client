import React from 'react';
import { Button, Input } from 'react-bootstrap';

class OutOfTime extends React.Component {
  render() {
    return (
      <div className="card">
      <div className="card-inner">
        <h1>You ran out of time!</h1>
        <p>
          <img src="/images/time.gif" />
        </p>
        <p>
          <Button bsStyle="primary" onClick={this.props.resetGame}>Reset game</Button>
        </p>
      </div>
      </div>
    );
  }
};

export default OutOfTime;
