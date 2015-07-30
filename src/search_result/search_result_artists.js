import React from 'react';
import _ from 'lodash';
import ArtistList from 'artist/artist_list';

class SearchResultArtists extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(_.isEmpty(this.props.artists)) { return false; }

    return (
      <div className="component">
        <header>
          <h2>Artists</h2>
        </header>
        <section>
          <ArtistList artists={this.props.artists} />
        </section>
      </div>
    );
  }

};

SearchResultArtists.propTypes = {
  artists: React.PropTypes.array.isRequired
};

export default SearchResultArtists;
