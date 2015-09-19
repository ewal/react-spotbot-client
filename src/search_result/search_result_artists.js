import React from 'react';
import _ from 'lodash';
import ArtistList from 'artist/artist_list';
import ComponentHeader from 'components/component_header';

class SearchResultArtists extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(_.isEmpty(this.props.artists)) { return false; }

    return (
      <div className="component">
        <ComponentHeader title="Artists" />
        <section>
          <ArtistList artists={this.props.artists} />
        </section>
      </div>
    );
  }

};

SearchResultArtists.propTypes = {
  artists: React.PropTypes.array
};

SearchResultArtists.defaultProps = {
  artists: []
};

export default SearchResultArtists;
