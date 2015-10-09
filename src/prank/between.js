import React from 'react/addons';

class Between extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      time: 3
    };

    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      let time = this.state.time -1;
      if(time === 0) {
        this.props.upIndex();
      }
      else {
        this.setState({ time: time });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <h1>Get ready!</h1>
        <h1>#{this.state.time}</h1>
      </div>
    );
  }
};

export default Between;
