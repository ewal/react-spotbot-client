import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import BackgroundImage from 'components/background_image';

/**
 * Artist item module
 * @module artist/artist_item
 */

class ArtistItem extends React.Component {

  render() {

    let artist = this.props.artist,
        name = _.trunc(artist.name,40);

    return (
      <div className="album-item">
        <div className="thumbnail">
          <div className="album-item-image-wrapper">
            <BackgroundImage image={artist.images[1]} classNames="album-item-image-container" />
          </div>
          <Link className="caption" to="artist" params={{ id: artist.id }}>{name}</Link>
        </div>
      </div>
    );
  }
};

export default ArtistItem;
