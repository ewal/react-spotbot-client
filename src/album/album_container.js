import React from 'react';
import AlbumMetadataApi from '_apis/album_metadata_api';
import utils from 'utils';
import { Link } from 'react-router';
import Track from 'components/track_table_row';
import { Table, Button } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import TableHeader from 'components/track_table_header';
import BackgroundImage from 'components/background_image';

class Artists extends React.Component {
  render() {

    let artists = this.props.artists.map((artist, index) => {
      return <span key={index}><Link to='artist' params={{ id: artist.id }}>{artist.name}</Link></span>;
    });

    return (
      <div>
        {artists}
      </div>
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
    this.fetchAlbum(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchAlbum(nextProps.params.id);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.params.id !== this.state.album.id;
  }

  handleClick() {
    FirebaseRef.child('playlist/uri').set(this.state.album.uri);
    FirebaseRef.child('player/next').set(true);
  }

  fetchAlbum(id) {
    AlbumMetadataApi.fetch(id).then((response) => {
      this.setState({
        album: response
      });
    }).catch((message) => {
      throw new Error(message);
    });
  }

  render() {
    if(_.isEmpty(this.state.album)) { return false; }

    let album = this.state.album;
    let tracks = album.tracks.items.map((track, index) => {
      return <Track track={track} key={index} index={index} />;
    });

    let releaseDate = utils.date.year(album.release_date);

    return (
      <div className="container-fluid album-container">
        <header className="page-header clearfix">
          <div className="media">
            <BackgroundImage classNames="media-object" image={album.images[1]} />
          </div>
          <div className="info">
            <span className="header-label">Album</span>
            <h1>{album.name} {releaseDate}</h1>
            <div>
              <Artists artists={album.artists} />
            </div>
            <div className="actions">
              <Button bsStyle="primary">Play album</Button>
            </div>
          </div>
        </header>
        <Table hover>
          <TableHeader index />
          <tbody>
            {tracks}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default AlbumContainer;
