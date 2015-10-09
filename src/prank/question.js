import React from 'react/addons';
import { Button, Input } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAnswered: false,
      time: 20,
      answer: 0
    };

    this.timer = null;
  }

  componentDidMount() {
    FirebaseRef.child('player/current_track/uri').set(this.props.song);
    this.timer = setInterval(() => {
      let left = this.state.time -1;

      if(left !== 0) {
        this.setState({ time: left });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillUnmount() {
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
          <h1>Question</h1>
          <p>
            Time left: {this.state.time}
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

  render() {

    let style = {
      backgroundImage: 'url(' + this.props.bg + ')',
      backgroundSize: 'cover'
    };

    return (
      <div style={style}>
        <section>
          {this.renderOptions()}
          {this.renderContinue()}
        </section>
      </div>
    );
  }

};

export default Question;
