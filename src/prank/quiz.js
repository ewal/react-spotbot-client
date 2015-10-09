import React from 'react/addons';
import { Button, Input } from 'react-bootstrap';
import classNames from 'classnames';

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class Quiz extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasAnswered: false,
      correct: false,
      timer: 30,
      canContinue: false,
      inputValue: ''
    };

    this.timer = null;

    this.questions = [
      "What year did Toto release their first album?",
      "What was the name of Totos first drummer?",
      "How many studio albums have Toto released?",
      "How long, in seconds, is Rosanna?"
    ];

    this.answers = [
      "1978",
      "Jeff Porcaro",
      "13",
      "331"
    ];

    this.congrats = [
      "Good work!",
      "Very well done!",
      "I'm so proud of you!",
      "Soon we are equals"
    ];

    this.messages = [
      "That's really something! Here, enjoy a picture of happy people most likley listening to Toto. Just in case you didn't know, Toto is also fun!",
      "",
      "",
      ""
    ];
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.setState({ timer: this.state.timer-1 });
      if(this.state.timer === 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  componentDidMount() {
    this.startTimer();
  }

  testAnswer() {
    let input = this.refs.input.getValue().toLowerCase();
    let answer = this.answers[this.props.cardIndex].toLowerCase();

    if(input === answer) {
      clearInterval(this.timer);
      this.setState({ correct: true });
    }
    else {
      this.setState({ hasAnswered: true });
    }
  }

  continueGame() {
    this.props.upIndex();
    this.setState({ canContinue: false, hasAnswered: false, correct: false, inputValue: '', timer: 30 });
    this.startTimer();
  }

  handleInputChange() {
    this.setState({ inputValue: this.refs.input.getValue(), hasAnswered: false });
  }

  maybeRenderCorrectContinue() {
    if(!this.state.correct) { return false; }

    let canContinue = classNames({ 'hide': !this.state.correct });

    return (
      <div>
        <h1>{this.congrats[this.props.cardIndex]}</h1>
        <div>
        <p>
          {this.messages[this.props.cardIndex]}
        </p>
          <p>
            Are you ready to continue?
          </p>
          <Button className={canContinue} onClick={this.continueGame.bind(this)} bsSize="lg">Continue</Button>
        </div>
      </div>
    );
  }

  maybeRenderForm() {

    if(this.state.correct) { return false; }

    let showAnswerButton = classNames({ 'hide': this.state.correct });

    let feedbackMessage = "",
        feedbackStyle = "";

    if(this.state.hasAnswered) {
      feedbackMessage = "Wrong! Try again.";
      feedbackStyle = "error";
    }

    let inputProps = {
      help: feedbackMessage,
      type: 'text',
      ref: 'input',
      value: this.state.inputValue,
      onChange: this.handleInputChange.bind(this),
      bsSize: 'small',
      bsStyle: feedbackStyle
    };

    return (
      <div>
        <h1>Question {this.props.cardIndex+1}</h1>
        <h2>
          {this.questions[this.props.cardIndex]}
        </h2>
        <Input {...inputProps} />
        <Button className={showAnswerButton} onClick={this.testAnswer.bind(this)} bsSize="lg">Answer</Button>
        <h2>Time left: {this.state.timer}</h2>
      </div>
    );
  }

  render() {

    return (
      <ReactCSSTransitionGroup transitionName="prank-quiz" transitionAppear={true}>
        <div>
        {this.maybeRenderCorrectContinue()}
        {this.maybeRenderForm()}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
};

export default Quiz;
