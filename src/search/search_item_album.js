import React from 'react';
import SearchItem from 'search/search_item';
import classNames from 'classnames';
import { Link } from 'react-router';
import BackgroundImage from 'components/background_image';

class SearchItemAlbum extends SearchItem {
  render() {

    let klass = classNames('album', { 'active': (this.props.currentIndex === this.props.index) });
    let item = this.props.item;
    let imageKlasses = classNames('bg-image', { 'hide': _.isUndefined(item.images[2]) } );

    return (
      <dd className={klass}>
        <BackgroundImage image={item.images[2]} classNames={imageKlasses} />
        <span className="info">
          <Link to="album" params={{ id: item.id }} onClick={this.handleClick.bind(this)}>
            {item.name}
          </Link>
        </span>
      </dd>
    );
  }
};

SearchItemAlbum.propTypes = {
  index: React.PropTypes.number.isRequired,
  currentIndex: React.PropTypes.number.isRequired,
  item: React.PropTypes.object.isRequired
};

export default SearchItemAlbum;
