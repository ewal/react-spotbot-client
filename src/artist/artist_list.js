import React from 'react';
import ArtistItem from 'artist/artist_item';

/**
 * Artist list module
 * @module artist/artist_list
 */

class ArtistList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(_.isEmpty(this.props.artists)) { return false; }

    let offset = _.take(this.props.artists, 5);
    let artists = offset.map((artist) => {
      return (
        <ArtistItem artist={artist} key={artist.id} />
      );
    });

    return (
      <div className="artist-list">
        {artists}
      </div>
    );
  }
};

ArtistList.propTypes = {
  artists: React.PropTypes.array.isRequired
};

export default ArtistList;
