import React from 'react';
import { Button } from 'react-bootstrap';

class FullscreenToggle extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button bsStyle="link" onClick={this.props.toggleFullscreen}><i className="fa fa-expand" /></Button>
    );
  }
};

FullscreenToggle.propTypes = {
  toggleFullscreen: React.PropTypes.func.isRequired
};

export default FullscreenToggle;
