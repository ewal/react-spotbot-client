import React from 'react';
import SearchItem from 'search/search_item';
import classNames from 'classnames';
import { Link } from 'react-router';

class SearchItemTrack extends SearchItem {
  render() {

    let klass = classNames('track', { 'active': (this.props.currentIndex === this.props.index) });
    let item = this.props.item;

    return (
      <dd className={klass}>
        <span className="info">
          <Link to="album" params={{ id: item.album.id }} query={{trackId: item.id }} onClick={this.handleClick.bind(this)}>
            {this.props.item.name}
          </Link>
          <span className="artist">{item.artists[0].name}</span>
        </span>
      </dd>
    );
  }
};

SearchItemTrack.propTypes = {
  index: React.PropTypes.number.isRequired,
  currentIndex: React.PropTypes.number.isRequired,
  item: React.PropTypes.object.isRequired
};

export default SearchItemTrack;
