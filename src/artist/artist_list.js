import React from 'react';
import ArtistItem from 'artist/artist_item';

class ArtistList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let offset = _.take(this.props.artists, 5);
    let artists = offset.map((artist, index) => {
      return (
        <ArtistItem artist={artist} key={index} />
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
