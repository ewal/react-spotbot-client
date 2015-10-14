import React from 'react';
import { Button, Input } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAnswered: false,
      answer: false,
      timeLeft: 0
    };

    this.timer = null;
  }

  componentDidMount() {
    FirebaseRef.child('player/current_track/uri').set(this.props.song);
    FirebaseRef.child('player/playing').set(true);

    this.setState({ timeLeft: this.props.getTimeLeft() });
    this.timer = setInterval(() => {
      let left = this.state.timeLeft -1;

      if(left > -1 && !this.state.hasAnswered) {
        this.setState({ timeLeft: left });
      }
      if(left === -1 && !this.state.hasAnswered) {
        clearInterval(this.timer);
        this.props.setOutOfTime();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.props.updateTimeLeft(this.state.timeLeft);
    clearInterval(this.timer);
  }

  handleClick() {
    this.setState({ hasAnswered: true });
    this.props.setAnswer(this.state.answer);
  }

  handleChange(answer) {
    this.setState({ answer: answer });
  }

  renderOptions() {
    if(this.state.hasAnswered) { return false; }

    let options = this.props.answers.map((item, index) => {
      return (
        <li key={index}>
          <Input disabled={this.state.hasAnswered} onChange={this.handleChange.bind(this, item.correct)} name="q3" type="radio" value="1" label={item.answer} />
        </li>
      );
    });

    return (
      <div>
        <header>
          <h1>Question {this.props.no}</h1>
          <p>
            {this.props.question}
          </p>
          <p>
            Time left: {this.state.timeLeft}
          </p>
        </header>
        <ul className="list-unstyled">
          {options}
        </ul>
        <div>
          <Button bsStyle="primary" onClick={this.handleClick.bind(this)}>Submit answer</Button>
        </div>
      </div>
    );
  }

  renderContinue() {
    if(!this.state.hasAnswered) { return false; }

    let image = '';
    if(this.props.taunt.image !== null) {
      image = <p><img src={this.props.taunt.image} /></p>;
    }

    return (
      <div>
        <h2>{this.props.taunt.header}</h2>
        <p>
          {this.props.taunt.body}
        </p>
        {image}
        <p>
          Time left: {this.state.timeLeft}
        </p>
        <div>
          <Button bsStyle="primary" onClick={this.props.upIndex}>Next question!</Button>
        </div>
      </div>
    );
  }

  render() {

    return (
      <div className="card">
        <section className="card-inner">
          {this.renderOptions()}
          {this.renderContinue()}
        </section>
      </div>
    );
  }

};

export default Question;
