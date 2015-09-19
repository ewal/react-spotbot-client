import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import BackgroundImage from 'components/background_image';
import classNames from 'classnames';

/**
 * Artist item module
 * @module artist/artist_item
 */

class ArtistItem extends React.Component {

  render() {

    let artist = this.props.artist,
        name = _.trunc(artist.name,40);

    let wrapperStyle = {};

   if(!_.isUndefined(artist.images[1])) {
      wrapperStyle = {
        backgroundImage: 'url(' + artist.images[1].url + ')',
        backgroundSize: '200%',
        backgroundPosition: 'center center'
      };
    }

    let wrapperClass = classNames('album-item-image-wrapper artist-item-image-wrapper', {'has-image': !_.isUndefined(artist.images[1])} );

    return (
      <div className="album-item">
        <div className="thumbnail">
          <div className={wrapperClass} style={wrapperStyle}>
            <Link to="artist" params={{ id: artist.id }} tabIndex="-1">
              <BackgroundImage image={artist.images[1]} classNames="album-item-image-container artist-image" />
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
