import React from 'react';
import { Input } from 'react-bootstrap';
import _ from 'lodash';
import SearchApi from '_apis/search_api';
import FirebaseRef from 'firebase_ref';
import classNames from 'classnames';
import { Link } from 'react-router';
import SearchStore from '_stores/search_store';
import AutoComplete from 'search/auto_complete';

class SearchContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      albums: [],
      artists: [],
      tracks: [],
      index: -1,
      total: 0
    };

    this.timer = null;
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

  fetchSearchResult() {
    if(this.state.query.length < 2) { return; }
    let query = this.state.query;

    SearchApi.search(query).then((response) => {
      let tracks = _.isUndefined(response.tracks) ? {} : _.take(response.tracks.items, 3);
      let albums = _.isUndefined(response.albums) ? {} : _.take(response.albums.items, 3);
      let artists = _.isUndefined(response.artists) ? {} : _.take(response.artists.items, 3);
      this.setState({
        albums: albums,
        tracks: tracks,
        artists: artists,
        total: albums.length + tracks.length + artists.length
      });
    }).catch((message) => {
      throw new Error(message);
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.state.index !== -1) {
      var obj = SearchStore.gGetNavigateObject();
      if(obj.item.type === 'track') {
        this.context.router.transitionTo(obj.route, { id: obj.item.album.id }, { trackId: obj.item.id });
      }
      else {
        this.context.router.transitionTo(obj.route, { id: obj.item.id });
      }
      this.props.toggleSearch();
    }
    else {
      if(!_.isEmpty(this.state.query)) {
        this.context.router.transitionTo('search', { query: this.state.query });
        this.props.toggleSearch();
      }
    }
  }

  handleChange() {
    clearTimeout(this.timer);

    this.setState({
      query: this.refs.input.getValue(),
      index: -1
    });

    if(this.state.query.length > 1) {
      this.timer = setTimeout(this.fetchSearchResult.bind(this), 250);
    }
    else {
      this.setState({
        albums: [],
        tracks: [],
        artists: [],
        index: -1,
        total: 0
      });
    }
  }

  moveUp() {
    let index = this.state.index-1,
        total = this.state.total;

    total = _.isUndefined(total) ? 0 : total;

    if(index !== -2 && total !== 0) {
      this.setState({ index: index });
    }
  }

  moveDown() {
    let index = this.state.index+1,
        total = this.state.total;

    total = _.isUndefined(total) ? 0 : total;

    if(index !== total && total !== 0) {
      this.setState({ index: index });
    }
  }

  handleKeyDown(e) {
    switch(e.which) {
      case 27:
        if(_.isEmpty(this.state.query)) {
          this.props.toggleSearch();
        }
        else {
          this.setState({ query: '' });
        }
      break;
      case 40:
        this.moveDown();
      break;
      case 38:
        this.moveUp();
      break;
    }
  }

  render() {
    return (
      <div className="search-container">
        <form method="get" onSubmit={this.handleSubmit.bind(this)}>
          <Input
            type="text"
            placeholder="Search..."
            value={this.state.query}
            ref="input"
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            />
        </form>
        <AutoComplete
          albums={this.state.albums}
          tracks={this.state.tracks}
          artists={this.state.artists}
          index={this.state.index}
          hideSearchContainer={this.props.hideSearchContainer}
        />
      </div>
    );
  }
};

SearchContainer.contextTypes = {
  router: React.PropTypes.func.isRequired
};

SearchContainer.propTypes = {
  hideSearchContainer: React.PropTypes.func.isRequired,
  toggleSearch: React.PropTypes.func.isRequired
};

export default SearchContainer;
