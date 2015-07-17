import React from 'react';
import AlbumMetadataApi from '_apis/album_metadata_api';
import utils from 'utils';
import { Link } from 'react-router';
import Track from 'components/track_table_row';
import { Table } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import TableHeader from 'components/track_table_header';

class Artists extends React.Component {
  render() {

    // TODO:
    // - link artist to artist page
    let artists = this.props.artists.map((artist) => {
      return <li><Link to='artist' params={{ id: artist.id }}>{artist.name}</Link></li>;
    });

    return (
      <ul>
        {artists}
      </ul>
    );
  }
};

Artists.propTypes = { artists: React.PropTypes.array.isRequired };

class AlbumContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      album: {}
    };
  }

  componentDidMount() {
    AlbumMetadataApi.fetch(this.props.params.id).then((response) => {
      this.setState({
        album: response
      });
    }).catch((message) => {
      throw new Error(message);
    });
  }

  handleClick() {
    FirebaseRef.child('playlist/uri').set(this.state.album.uri);
    FirebaseRef.child('player/next').set(true);
  }

  render() {
    if(_.isEmpty(this.state.album)) { return false; }

    let album = this.state.album;
    let tracks = album.tracks.items.map((track, index) => {
      return <Track track={track} key={index} index={index} />;
    });

    // TODO:
    // - set album as current playlist
    // - test if images exist

    let imageUrl = (!_.isEmpty(album.images)) ? album.images[1].url : '';
    let bs = {
      backgroundImage: 'url(' + imageUrl + ')'
    };

    return (
      <div className="container-fluid">
        <header className="page-header">
          Album
          <div className="media-header-image-container">
            <div className="media-header-image-object" style={bs} />
          </div>
          <h1>{album.name}</h1>
          <h3>Release date {album.release_date}</h3>
        </header>
        <h3>Artists</h3>
        <Artists artists={album.artists} />
        <Table hover>
          <TableHeader index />
          {tracks}
        </Table>
      </div>
    );
  }
};

export default AlbumContainer;
