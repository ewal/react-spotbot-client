import React from 'react';
import SearchItem from 'search/search_item';
import classNames from 'classnames';
import { Link } from 'react-router';
import BackgroundImage from 'components/background_image';

/**
 * Search item album module
 * @module search/search_item_album
 */

class SearchItemAlbum extends SearchItem {
  render() {

    let klass = classNames('album', { 'active': (this.props.currentIndex === this.props.index) });
    let item = this.props.item;

    return (
      <dd className={klass}>
        <BackgroundImage image={item.images[2]} classNames="bg-image" />
        <span className="info">
          <Link to="album" params={{ id: item.id }} onClick={this.handleClick.bind(this)}>
            {item.name}
          </Link>
        </span>
      </dd>
    );
  }
};

export default SearchItemAlbum;