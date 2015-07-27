import React from 'react';
import { Table } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import Track from 'components/track_table_row';
import TableHeader from 'components/track_table_header';
import utils from 'utils';
import { Link } from 'react-router';
import AlbumMetadataApi from '_apis/album_metadata_api';
import TrackMetadataApi from '_apis/track_metadata_api';

class PlaylistContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playlistName: '',
      tracks: [],
      tyoe: '',
      uri: ''
    };
  }

  onPlaylistChange(snapshot) {
    let val = snapshot.val();
    if(!_.isNull(val)) {
      let type = utils.spotify.uriType(val.uri);
      let albumId = utils.spotify.parseId(val.uri);

      if(type === 'album') {
        AlbumMetadataApi.fetch(albumId).then((response) => {
          this.setState({
            playlistName: val.name,
            tracks: response.tracks.items,
            type: type,
            uri: val.uri
          });
        }).catch((message) => {
          throw new Error(message);
        });
      }
      else {
        TrackMetadataApi.fetchTracks(val.tracks).then((response) => {
          this.setState({
            playlistName: val.name,
            tracks: response.tracks,
            type: type,
            uri: val.uri
          });
        }).catch((message) => {
          throw new Error(message);
        });
      }
    }
  }

  componentDidMount() {
    FirebaseRef.child('playlist').on('value', this.onPlaylistChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('playlist').off('value', this.onPlaylistChange.bind(this));
  }

  renderPlaylist() {

    let tracks = this.state.tracks.map((track, index) => {
      return <Track key={index} index={index} track={track} album artist image />
    });

    return (
      <Table hover>
        <caption>{this.state.playlistName}</caption>
        <TableHeader index album artist image />
        <tbody>
          {tracks}
        </tbody>
      </Table>
    );
  }

  renderAlbum() {

    let tracks = this.state.tracks.map((track, index) => {
      return <Track key={index} index={index} track={track} />
    });

    return (
      <Table hover>
        <caption>{this.state.playlistName}</caption>
        <TableHeader index />
        <tbody>
          {tracks}
        </tbody>
      </Table>
    );
  }

  render() {

    if(_.isEmpty(this.state.tracks)) { return false; }

    let tracks = '',
        playlistType = '';

    // TODO:
    // - handle keyboard up down. set active item. pass prop function

    if(this.state.type === 'album') {
      playlistType = this.renderAlbum();
    }
    else {
      playlistType = this.renderPlaylist();
    }

    return (
      <div className="container-fluid">
        <header className="page-header">
          <h1>Playlist</h1>
        </header>
        <section>
          {playlistType}
        </section>
      </div>
    );
  }
};

export default PlaylistContainer;
