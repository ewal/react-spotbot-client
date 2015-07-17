import React from 'react';
import { Input } from 'react-bootstrap';
import _ from 'lodash';

class SearchContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.searchVisible) {
      // Hopefully everythings is rendered and done.
      // Wait for it ... and focus
      setTimeout(() => {
        let input = this.refs.input.getInputDOMNode();
        React.findDOMNode(input).focus();
      }, 150);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if(!_.isEmpty(this.state.query)) {
      this.context.router.transitionTo('search', { query: this.state.query });
      this.props.toggleSearch();
    }
  }

  handleChange() {
    this.setState({
      query: this.refs.input.getValue()
    });
  }

  handleKeyUp(e) {
    if(e.which === 27) {
      this.props.toggleSearch();
    }
  }

  render() {
    return (
      <form method="get" onSubmit={this.handleSubmit.bind(this)}>
        <Input
          type="search"
          placeholder="Search..."
          value={this.state.query}
          ref="input"
          onChange={this.handleChange.bind(this)}
          onKeyUp={this.handleKeyUp.bind(this)}
          />
      </form>
    );
  }
};

SearchContainer.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default SearchContainer;
