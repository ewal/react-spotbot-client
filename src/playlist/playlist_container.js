import React from 'react';
import { Button, Modal, Input } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import utils from 'utils';
import { Link } from 'react-router';
import AlbumMetadataApi from '_apis/album_metadata_api';
import TrackMetadataApi from '_apis/track_metadata_api';
import TrackList from 'track/track_list';

class PlaylistContainer extends React.Component {

  constructor(props) {
    super(props);

    this.ref = null;

    this.state = {
      playlistName: '',
      tracks: [],
      tyoe: '',
      uri: '',
      showModal: false
    };
  }

  componentDidMount() {
    this.ref = FirebaseRef.child('playlist').on('value', (snapshot) => {
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
    });
  }

  componentWillUnmount() {
    FirebaseRef.child('playlist').off('value', this.ref);
  }

  renderPlaylist() {
    return (
      <TrackList tracks={this.state.tracks} album artist image header caption={this.state.playlistName} />
    );
  }

  renderAlbum() {
    return (
      <TrackList tracks={this.state.tracks} caption={this.state.playlistName} />
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

    let playlistType = '';

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
          <Modal.Header>
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
