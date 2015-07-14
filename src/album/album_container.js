import React from 'react';
import AlbumMetadataApi from '_apis/album_metadata_api';
import utils from 'utils';
import { Link } from 'react-router';
import TableRow from 'components/track_table_row';
import { Table, Thumbnail } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';

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
      return <TableRow track={track} key={index} />;
    });

    // TODO:
    // - list and link artists
    // - album cover
    // - set album as current playlist

    return (
      <div className="container-fluid">
        <header>
          <Thumbnail onClick={this.handleClick.bind(this)} src={album.images[1].url} />
          <h2>{this.state.album.name}</h2>
        </header>
        <Artists artists={this.state.album.artists} />
        <Table hover>
          {tracks}
        </Table>
      </div>
    );
  }
};

export default AlbumContainer;
