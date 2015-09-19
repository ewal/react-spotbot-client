import React from 'react';

class ComponentHeader extends React.Component {
  render() {
    return (
      <header>
        <h2>{this.props.title}</h2>
      </header>
    );
  }
};

ComponentHeader.propTypes = {
  title: React.PropTypes.string
};

export default ComponentHeader;
