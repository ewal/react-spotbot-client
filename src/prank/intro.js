import React from 'react/addons';
import { Button } from 'react-bootstrap';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class Intro extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      on: false
    };
  }

  render() {
    return (
      <div className="intro card">
        <div className="card-inner">

          <ReactCSSTransitionGroup transitionName="switch1" transitionAppear={true}>
            <h1>Oh, hello there, Mike</h1>
          </ReactCSSTransitionGroup>

          <ReactCSSTransitionGroup transitionName="switch2" transitionAppear={true}>
          <p>
            I would like to play a game. Do you like games, Mike?
          </p>
          </ReactCSSTransitionGroup>

          <ReactCSSTransitionGroup transitionName="switch3" transitionAppear={true}>
          <p>
            Don't try to refresh the browser, the game will start over.<br />
            There is no escape from this. Complete the game and I will return the player to your control.<br />
          </p>
          </ReactCSSTransitionGroup>

          <ReactCSSTransitionGroup transitionName="switch4" transitionAppear={true}>
          <p>
            You've got 1 minute to answer 5 questions.
            Are you ready to let the game begin?
          </p>
          <Button onClick={this.props.startGame} bsSize="lg">Start the game</Button>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
};

export default Intro;
