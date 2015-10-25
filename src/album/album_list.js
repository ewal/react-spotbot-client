import React from 'react';
import AlbumItem from 'album/album_item';
import _ from 'lodash';

class AlbumList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(_.isEmpty(this.props.albums)) { return false; }

    let albums = this.props.albums.map((album) => {
      return (
        <AlbumItem album={album} key={album.id} />
      );
    });

    return (
      <div className="album-list">
        {albums}
      </div>
    );
  }
};

AlbumList.propTypes = {
  albums: React.PropTypes.array
};

AlbumList.defaultProps = {
  albums: []
};

export default AlbumList;
