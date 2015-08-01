import React from 'react';
import SearchItem from 'search/search_item';
import classNames from 'classnames';
import { Link } from 'react-router';
import BackgroundImage from 'components/background_image';

/**
 * Search item track module
 * @module search/search_item_track
 */

class SearchItemTrack extends SearchItem {
  render() {

    let klass = classNames('track', { 'active': (this.props.currentIndex === this.props.index) });
    let item = this.props.item;

    return (
      <dd className={klass}>
        <Link to="album" params={{ id: item.album.id }} query={{trackId: item.id }} onClick={this.handleClick.bind(this)}>
          {this.props.item.name}
        </Link>
        <span className="artist">{item.artists[0].name}</span>
      </dd>
    );
  }
};

export default SearchItemTrack;
