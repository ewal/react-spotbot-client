import React from 'react';
import _ from 'lodash';
import AlbumList from 'album/album_list';
import Section from 'components/section';

class SearchResultAlbums extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(_.isEmpty(this.props.albums)) { return false; }

    return (
      <Section title="Albums">
        <AlbumList albums={this.props.albums} />
      </Section>
    );
  }
};

SearchResultAlbums.propTypes = {
  albums: React.PropTypes.array
};

SearchResultAlbums.defaultProps = {
  albums: []
};


export default SearchResultAlbums;
