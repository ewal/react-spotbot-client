import React from 'react/addons';
import { Button, Input } from 'react-bootstrap';
import classNames from 'classnames';
import Intro from './intro';
import Outro from './outro';
import Question from './question';
import Between from './between';
import FirebaseRef from 'firebase_ref';
import OutOfTime from './out_of_time';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let q1Answers = [
  { correct: false, answer: "1978" },
  { correct: true, answer: "1979" },
  { correct: false, answer: "1980" }
];

let q2Answers = [
  { correct: false, answer: "Chris Trujillo" },
  { correct: false, answer: "Simon Phillips" },
  { correct: true, answer: "Jeff Porcaro" }
];

let q3Answers = [
  { correct: false, answer: "7" },
  { correct: false, answer: "10" },
  { correct: true, answer: "13" }
];

let q4Answers = [
  { correct: true, answer: "Music Man" },
  { correct: false, answer: "Fender" },
  { correct: false, answer: "PRS" }
];

let q5Answers = [
  { correct: true, answer: "1" },
  { correct: true, answer: "2" },
  { correct: true, answer: "3" }
];

let q1Taunt = {
  header: "First question done!",
  body: "But the trip has just begun!",
  image: null
};

let q2Taunt = {
  header: "Wohoo!",
  body: "Man isn't this fun? Take a look at this picture. Aren't they having fun together? They are most likley listening to one of Totos many hits. Don't you wanna be apart of this picture, Mike?",
  image: "/images/Happy-People1.jpg"
};

let q3Taunt = {
  header: "Halfway through!",
  body: "I'm so excited for you!",
  image: null
};

let q4Taunt = {
  header: "Woop! Woop!",
  body: "You are almost done!",
  image: "/images/final.gif"
};

let q5Taunt = {
  header: "Yeah!",
  body: "All questions are answered! Lets continue and find out how you did!",
  image: null
};

let defaultState = {
  cardIndex: 0,
  gameBegun: false,
  gameFinished: false,
  correctAnswers: 0,
  timeLeft: 60
};

class PrankContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = defaultState;

    let commonProps = {
      upIndex: this.upIndex.bind(this),
      setAnswer: this.setAnswer.bind(this),
      getTimeLeft: this.getTimeLeft.bind(this),
      updateTimeLeft: this.updateTimeLeft.bind(this),
      setOutOfTime: this.setOutOfTime.bind(this)
    };

    this.cards = [
      <Between {...commonProps} />,
      <Question {...commonProps}
        question="Which year did Toto release their first album?"
        answers={q1Answers}
        taunt={q1Taunt}
        song="spotify:track:1aTAR21kFePsDBHnc74Hli"
        bg="/images/africa.jpg"
        no="1"
      />,
      <Between {...commonProps} />,
      <Question {...commonProps}
        question="What was the name of Totos first drummer?"
        answers={q2Answers}
        taunt={q2Taunt}
        song="spotify:track:4aVuWgvD0X63hcOCnZtNFA"
        bg="/images/hold_the_line.jpg"
        no="2"
      />,
      <Between {...commonProps} />,
      <Question {...commonProps}
        question="How many studio albums have Toto released over the years?"
        answers={q3Answers}
        taunt={q3Taunt}
        song="spotify:track:37BTh5g05cxBIRYMbw8g2T"
        bg="/images/rosanna.jpg"
        no="3"
      />,
      <Between {...commonProps} />,
      <Question {...commonProps}
        question="What guitar brand does Steve Lukather play on?"
        answers={q4Answers}
        taunt={q4Taunt}
        song="spotify:track:3LFdvM7nIV8t02zyhYLvJo"
        bg="/images/rosanna.jpg"
        no="4"
      />,
      <Between {...commonProps} />,
      <Question {...commonProps}
        question="How many fingers am I holding up?"
        answers={q5Answers}
        taunt={q5Taunt}
        song="spotify:track:73bzcsDjx9FqzqKWcPLMiH"
        bg="/images/rosanna.jpg"
        no="5"
      />
    ];

  }

  componentDidMount() {
    FirebaseRef.child('player/current_track/uri').set("spotify:track:2YG8xAFfakdvfZkg8fXZpJ");
    FirebaseRef.child('playlist/uri').set("spotify:album:7o37z78whARND3EwVjIYpO");
  }

  getTimeLeft() {
    return this.state.timeLeft;
  }

  upIndex() {
    this.setState({ cardIndex: this.state.cardIndex+1 });
  }

  updateTimeLeft(time) {
    this.setState({ timeLeft: time });
  }

  setOutOfTime() {
    this.setState({ timeLeft: 0 });
  }

  setAnswer(isCorrect) {
    if(isCorrect) {
      let score = this.state.correctAnswers +1;
      this.setState({ correctAnswers: score });
    }
  }

  startGame() {
    this.setState({ gameBegun: true });
  }

  resetGame() {
    defaultState.gameBegun = true;
    this.setState(defaultState);
    FirebaseRef.child('player/current_track/uri').set("spotify:track:2YG8xAFfakdvfZkg8fXZpJ");
  }

  render() {
    let card = "";
    if(this.state.gameBegun && this.state.timeLeft > 0) {
      if(this.state.cardIndex === this.cards.length) {
        card = <Outro correctAnswers={this.state.correctAnswers} resetGame={this.resetGame.bind(this)} />;
      }
      else {
        card = this.cards[this.state.cardIndex];
      }
    }
    else if(this.state.gameBegun && this.state.timeLeft <= 0) {
      card = <OutOfTime resetGame={this.resetGame.bind(this)} />;
    }
    else {
      card = <Intro startGame={this.startGame.bind(this)} />
    }

    let styles = {
      textAlign: 'center'
    };

    return (
      <ReactCSSTransitionGroup transitionName="switch" transitionAppear={true}>
      <div style={styles} className="prank-container">
        {card}
      </div>
      </ReactCSSTransitionGroup>
    );
  }
};

export default PrankContainer;
