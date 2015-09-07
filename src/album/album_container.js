import React from 'react';
import AlbumMetadataApi from '_apis/album_metadata_api';
import utils from 'utils';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import BackgroundImage from 'components/background_image';
import TrackList from 'track/track_list';
import StarPlaylist from 'components/star_playlist';

/**
 * Album container module
 * @module album/album_container
 */

class Artists extends React.Component {
  render() {

    let artists = this.props.artists.map((artist, index) => {
      let separator = "";
      if(this.props.artists.length-1 !== index) { separator = ", "; }
      return <span key={index}><Link to='artist' params={{ id: artist.id }}>{artist.name}</Link>{separator}</span>;
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

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.album.id !== this.state.album.id;
  }

  handleClick() {
    FirebaseRef.child('playlist/uri').set(this.state.album.uri);
    FirebaseRef.child('player/next').set(true);
  }

  fetchAlbum(id) {
    AlbumMetadataApi.album(id).then((response) => {
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
    let releaseDate = utils.date.year(album.release_date);

    return (
      <div className="container-fluid album-container">
        <header className="page-header clearfix">
          <div className="media">
            <BackgroundImage classNames="media-object" image={album.images[1]} />
          </div>
          <div className="info">
            <span className="header-label">Album</span>
            <h1>{album.name} <span className="release-date">{releaseDate}</span></h1>
            <div>
              <Artists artists={album.artists} />
            </div>
            <div className="actions">
              <Button bsStyle="primary" onClick={this.handleClick.bind(this)}>Play album</Button>
              <StarPlaylist uri={album.uri} name={album.name} type="album" />
            </div>
          </div>
        </header>
        <TrackList tracks={album.tracks.items} query={this.props.query} />
      </div>
    );
  }
};

export default AlbumContainer;
