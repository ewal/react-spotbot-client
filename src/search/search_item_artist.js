import React from 'react';
import SearchItem from 'search/search_item';
import classNames from 'classnames';
import { Link } from 'react-router';
import BackgroundImage from 'components/background_image';

/**
 * Search item artist module
 * @module search/search_item_artist
 */

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

export default SearchItemArtist;
