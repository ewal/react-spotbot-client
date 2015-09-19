import React from 'react';
import _ from 'lodash';
import AlbumList from 'album/album_list';
import ComponentHeader from 'components/component_header';

class SearchResultAlbums extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(_.isEmpty(this.props.albums)) { return false; }

    return (
      <div className="component">
        <ComponentHeader title="Albums" />
        <section>
          <AlbumList albums={this.props.albums} />
        </section>
      </div>
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
