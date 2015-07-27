import React from 'react';
import { Input } from 'react-bootstrap';
import _ from 'lodash';
import SearchApi from '_apis/search_api';
import FirebaseRef from 'firebase_ref';
import classNames from 'classnames';
import { Link } from 'react-router';

class SearchItem extends React.Component {
  handleClick() {
    this.props.hideSearchContainer();
  }
  render() {
    return false;
  }
};

class SearchItemTrack extends React.Component {
  render() {

    let klass = classNames('track', { 'active': (this.props.currentIndex === this.props.index) });

    return (
      <dd className={klass}>
        {this.props.item.name}
        <span className="artist">{this.props.item.artists[0].name}</span>
      </dd>
    );
  }
};

class SearchItemAlbum extends SearchItem {
  render() {

    let klass = classNames('album', { 'active': (this.props.currentIndex === this.props.index) });
    let item = this.props.item;

    return (
      <dd className={klass}>
        <Link to="album" params={{ id: item.id }} onClick={this.handleClick.bind(this)}>
          {item.name}
        </Link>
      </dd>
    );
  }
};

class SearchItemArtist extends SearchItem {
  render() {

    let klass = classNames('artist', { 'active': (this.props.currentIndex === this.props.index) });
    let item = this.props.item;

    return (
      <dd className={klass}>
        <Link to="artist" params={{ id: item.id }} onClick={this.handleClick.bind(this)}>
          {this.props.item.name}
        </Link>
      </dd>
    );
  }
};

class AutoComplete extends React.Component {

  getIndex(index) {
    return index+=1;
  }

  render() {

    let index = -1;
    let commonProps = {
      hideSearchContainer: this.props.hideSearchContainer
    };

    let tracks = this.props.tracks.map((track) => {
      index = this.getIndex(index);
      return <SearchItemTrack {...commonProps} currentIndex={this.props.index} index={index} key={index} item={track} />;
    });

    let albums = this.props.albums.map((album) => {
      index = this.getIndex(index);
      return <SearchItemAlbum {...commonProps} currentIndex={this.props.index} index={index} key={index} item={album} />;
    });

    let artists = this.props.artists.map((artist) => {
      index = this.getIndex(index);
      return <SearchItemArtist {...commonProps} currentIndex={this.props.index} index={index} key={index} item={artist} />;
    });

    return (
      <dl className="auto-complete">
        <dt>Songs</dt>
        {tracks}
        <dt>Albums</dt>
        {albums}
        <dt>Artists</dt>
        {artists}
      </dl>
    );
  }
};

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

  componentWillReceiveProps(nextProps) {
    // Always reset the index
    this.setState({ index: 0});
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
    clearTimeout(this.timer);

    this.setState({
      query: this.refs.input.getValue()
    });
    if(this.state.query.length > 1) {
      this.timer = setTimeout(this.fetchSearchResult.bind(this), 250);
    }
    else {
      this.clearState();
    }
  }

  clearState() {
    this.setState({
      albums: [],
      tracks: [],
      artists: []
    });
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

export default SearchContainer;
