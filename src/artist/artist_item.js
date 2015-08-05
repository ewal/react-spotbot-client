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
            <Link to="artist" params={{ id: artist.id }} tabIndex="-1">
              <BackgroundImage image={artist.images[1]} classNames="album-item-image-container" />
            </Link>
          </div>
          <Link className="caption" to="artist" params={{ id: artist.id }}>{name}</Link>
        </div>
      </div>
    );
  }
};

ArtistItem.propTypes = {
  artist: React.PropTypes.object.isRequired
};

export default ArtistItem;
