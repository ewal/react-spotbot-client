import React from 'react/addons';
import { Button, Input } from 'react-bootstrap';
import classNames from 'classnames';
import Intro from './intro';
import Outro from './outro';
import Quiz from './quiz';
import Q1 from './q1';
import Q2 from './q2';
import Q3 from './q3';
import Between from './between';
import FirebaseRef from 'firebase_ref';

let q1Answers = [
  { correct: true, answer: "Some answer" },
  { correct: false, answer: "Some answer" },
  { correct: false, answer: "Some answer" }
];

let q2Answers = [
  { correct: true, answer: "Some answer" },
  { correct: false, answer: "Some answer" },
  { correct: false, answer: "Some answer" }
];

let q3Answers = [
  { correct: true, answer: "Some answer" },
  { correct: false, answer: "Some answer" },
  { correct: false, answer: "Some answer" }
];

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class PrankContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cardIndex: 0,
      gameBegun: false,
      gameFinished: false
    };

    let commonProps = {
      upIndex: this.upIndex.bind(this),
      setAnswer: this.setAnswer.bind(this)
    };

    this.cards = [
      <Q1 {...commonProps}
        answers={q1Answers}
        song="spotify:track:1aTAR21kFePsDBHnc74Hli"
        bg="/images/africa.jpg"
      />,
      <Between {...commonProps} />,
      <Q2  {...commonProps}
        answers={q2Answers}
        song="spotify:track:4aVuWgvD0X63hcOCnZtNFA"
        bg="/images/hold_the_line.jpg"
      />,
      <Between {...commonProps} />,
      <Q3 {...commonProps}
        answers={q3Answers}
        song="spotify:track:37BTh5g05cxBIRYMbw8g2T"
        bg="/images/rosanna.jpg"
      />
    ];

    this.answers = [];
  }

  componentDidMount() {
    FirebaseRef.child('player/current_track/uri').set("spotify:track:2YG8xAFfakdvfZkg8fXZpJ");
  }

  upIndex() {
    this.setState({ cardIndex: this.state.cardIndex+1 });
  }

  setAnswer(isCorrect) {
    this.answers.push[isCorrect];
  }

  startGame() {
    this.setState({ gameBegun: true });
  }

  resetGame() {
    this.setState({
      gameBegun: false,
      cardIndex: 0,
      gameFinished: false
    });
    FirebaseRef.child('player/current_track/uri').set("spotify:track:2YG8xAFfakdvfZkg8fXZpJ");
  }

  render() {
    let card = "";

    if(this.state.gameBegun) {
      if(this.state.cardIndex === this.cards.length) {
        card = <Outro answers={this.answers} resetGame={this.resetGame.bind(this)} />;
      }
      else {
        card = this.cards[this.state.cardIndex];
      }
    }
    else {
      card = <Intro startGame={this.startGame.bind(this)} />
    }

    let styles = {
      textAlign: 'center'
    };

    return (
      <div style={styles} className="prank-container">
        {card}
      </div>
    );
  }
};

export default PrankContainer;
