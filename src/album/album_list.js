import React from 'react';
import AlbumItem from 'album/album_item';

class AlbumList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let albums = this.props.albums.map((album, index) => {
      return (
        <AlbumItem album={album} key={index} />
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
  albums: React.PropTypes.array.isRequired
};

export default AlbumList;
