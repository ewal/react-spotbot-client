import React from 'react';

class AlbumList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let albums = this.props.albums.map((album) => {
      return <li>{album.name}</li>;
    });

    return (
      <ul>
      {albums}
      </ul>
    );
  }
};

AlbumList.propTypes = {
  albums: React.PropTypes.array.isRequired
};

export default AlbumList;
