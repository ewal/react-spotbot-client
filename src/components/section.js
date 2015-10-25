import React from 'react';

class Section extends React.Component {
  render() {
    return (
      <div className="component">
      <header>
        <h2>{this.props.title}</h2>
      </header>
      {this.props.children}
      </div>
    );
  }
};

Section.propTypes = {
  title: React.PropTypes.string
};

export default Section;
