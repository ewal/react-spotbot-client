import React from 'react';
import { Input } from 'react-bootstrap';
import _ from 'lodash';

class SearchContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.after = <i className="fa fa-search" />;
  }

  handleSubmit(e) {
    e.preventDefault();

    if(!_.isEmpty(this.state.query)) {
      this.context.router.transitionTo('search', { query: this.state.query });
    }
  }

  handleChange() {
    this.setState({
      query: this.refs.input.getValue()
    });
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
          addonAfter={this.after}
          />
      </form>
    );
  }
};

SearchContainer.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default SearchContainer;
