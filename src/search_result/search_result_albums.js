import React from 'react';
import _ from 'lodash';
import AlbumList from 'album/album_list';

class SearchResultAlbums extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(_.isEmpty(this.props.albums)) { return false; }

    return (
      <div className="component">
        <header>
          <h2>Albums</h2>
        </header>
        <section>
          <AlbumList albums={this.props.albums} />
        </section>
      </div>
    );
  }

};

export default SearchResultAlbums;
