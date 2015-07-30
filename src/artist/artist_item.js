import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

class ArtistItem extends React.Component {

  render() {

    let artist = this.props.artist,
        name = _.trunc(artist.name,40),
        imageUrl = (!_.isEmpty(artist.images)) ? artist.images[1].url : '',
        bgImage = {
          backgroundImage: 'url(' + imageUrl + ')',
        };

    return (
      <div className="album-item">
        <div className="thumbnail">
          <div className="album-item-image-wrapper">
            <div className="album-item-image-container" style={bgImage} />
          </div>
          <Link className="caption" to="artist" params={{ id: artist.id }}>{name}</Link>
        </div>
      </div>
    );
  }
};

export default ArtistItem;
