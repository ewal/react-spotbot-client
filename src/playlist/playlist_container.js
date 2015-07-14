import React from 'react';
import { Table } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import Track from 'components/track_table_row';
import FullTrack from 'components/track_full_table_row';
import utils from 'utils';

import AlbumMetadataApi from '_apis/album_metadata_api';
import TrackMetadataApi from '_apis/track_metadata_api';

class PlaylistContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playlistName: '',
      tracks: []
    };
  }

  onPlaylistChange(snapshot) {
    // TODO:
    // - user playlist or album? Switch and use different apis
    //
    let val = snapshot.val();
    if(!_.isNull(val)) {
      let type = utils.spotify.uriType(val.uri);
      if(type === 'album') {
        AlbumMetadataApi.fetch(val.uri).then((response) => {
          this.setState({
            playlistName: val.name,
            tracks: response.tracks.items,
            type: type
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
            type: type
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
      return <FullTrack key={index} track={track} />
    });

    return (
      <Table hover>
        <caption>{this.state.playlistName} <i className="fa fa-star-o"></i></caption>
        <thead>
          <tr>
            <th width="30">#</th>
            <th>Track</th>
            <th>Album</th>
            <th>Artist</th>
            <th width="30"><i className="fa fa-clock-o pull-right" /></th>
          </tr>
        </thead>
        <tbody>
          {tracks}
        </tbody>
      </Table>
    );
  }

  renderAlbum() {

    let tracks = this.state.tracks.map((track, index) => {
      return <Track key={index} track={track} />
    });

    return (
      <Table hover>
        <caption>{this.state.playlistName} <i className="fa fa-star-o"></i></caption>
        <thead>
          <tr>
            <th width="30">#</th>
            <th>Track</th>
            <th width="30"><i className="fa fa-clock-o pull-right" /></th>
          </tr>
        </thead>
        <tbody>
          {tracks}
        </tbody>
      </Table>
    );
  }

  render() {

    let tracks = '',
        playlistType = '';

    // TODO:
    // - split into two different containers
    // - keep components small
    // - handle keyboard up down. set active item. pass prop function

    if(!_.isEmpty(this.state.tracks)) {
      if(this.state.type === 'album') {
        playlistType = this.renderAlbum();
      }
      else {
        playlistType = this.renderPlaylist();
      }
    }

    return (
      <div>
        {playlistType}
      </div>
    );
  }
};

export default PlaylistContainer;
