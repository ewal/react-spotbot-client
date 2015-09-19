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
    let imageKlasses = classNames('bg-image artist', { 'hide': _.isUndefined(item.images[2]) } );

    return (
      <dd className={klass}>
        <BackgroundImage image={item.images[2]} classNames={imageKlasses} />
        <span className="info">
          <Link to="artist" params={{ id: item.id }} onClick={this.handleClick.bind(this)}>
            {this.props.item.name}
          </Link>
        </span>
      </dd>
    );
  }
};

SearchItemArtist.propTypes = {
  index: React.PropTypes.number.isRequired,
  currentIndex: React.PropTypes.number.isRequired,
  item: React.PropTypes.object.isRequired
};

export default SearchItemArtist;
