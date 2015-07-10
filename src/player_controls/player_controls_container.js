import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import classNames from 'classnames';

class PlayerControlsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false
    };
  }

  togglePlay() {
    this.setState({ playing: !this.state.playing });
  }

  render() {

    let playPauseKlass = classNames('fa', {'fa-play': !this.state.playing, 'fa-pause': this.state.playing});

    return (
      <div>
        <ButtonGroup>
          <Button onClick={this.togglePlay.bind(this)}><i className={playPauseKlass} /></Button>
          <Button><i className="fa fa-step-forward" /></Button>
        </ButtonGroup>
        <Button bsStyle="link"><i className="fa fa-random" /></Button>
      </div>
    );
  }
};

export default PlayerControlsContainer;
