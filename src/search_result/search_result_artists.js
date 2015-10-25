import React from 'react';
import _ from 'lodash';
import ArtistList from 'artist/artist_list';
import Section from 'components/section';

class SearchResultArtists extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(_.isEmpty(this.props.artists)) { return false; }

    return (
      <Section title="Artists">
        <ArtistList artists={this.props.artists} />
      </Section>
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
