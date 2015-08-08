import React from 'react';
import { Table, Button, Modal, Input } from 'react-bootstrap';
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
      uri: '',
      showModal: false,
      currentTrack: {}
    };
  }

  componentDidMount() {
    FirebaseRef.child('playlist').on('value', this.onPlaylistChange.bind(this));
    FirebaseRef.child('player/current_track').on('value', this.onTrackChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('playlist').off('value', this.onPlaylistChange.bind(this));
    FirebaseRef.child('player/current_track').off('value', this.onTrackChange.bind(this));
  }

  onTrackChange(snapshot) {
    let val = snapshot.val();
    this.setState({ currentTrack: val });
  }

  onPlaylistChange(snapshot) {
    let val = snapshot.val();
    if(!_.isNull(val)) {
      let type = utils.spotify.uriType(val.uri);
      let albumId = utils.spotify.parseId(val.uri);

      if(type === 'album') {
        AlbumMetadataApi.album(albumId).then((response) => {
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
        let trackIds = val.tracks.map(uri => {
          return utils.spotify.parseId(uri);
        });
        TrackMetadataApi.tracks(trackIds).then((response) => {
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

  renderPlaylist() {

    let tracks = this.state.tracks.map((track, index) => {
      return <Track key={index} index={index} track={track} album artist image currentTrack={this.state.currentTrack} />
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
      return <Track key={index} index={index} track={track} currentTrack={this.state.currentTrack} />
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

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  changePlaylist() {
    let val = this.refs.input_change.getValue();
    FirebaseRef.child('playlist/uri').set(val);
    this.closeModal();
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
          <h1>
            Playlist <Button bsStyle="link" onClick={this.showModal.bind(this)}>Change playlist</Button>
          </h1>
        </header>
        <section>
          {playlistType}
        </section>
        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)} autoFocus backdrop>
          <Modal.Header closeButton>
            <Modal.Title>Change playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input ref="input_change" type="text" placeholder="Paste uri or link to playlist or album" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>Close</Button>
            <Button bsStyle="primary" onClick={this.changePlaylist.bind(this)}>Ok</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
};

export default PlaylistContainer;
