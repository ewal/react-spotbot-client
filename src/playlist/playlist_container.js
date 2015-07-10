import React from 'react';
import { Table } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import Track from './track';

import PlaylistActions from '_actions/playlist_actions';
import PlaylistStore from '_stores/playlist_store';

class PlaylistContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playlistName: '',
      tracks: []
    };
  }

  onPlaylistChange(snapshot) {
    let val = snapshot.val();
    if(!_.isNull(val)) {
      PlaylistActions.load(val.tracks);
      this.setState({
        playlistName: val.name
      });
    }
  }

  onTracksChange(response) {
    this.setState({ tracks: response.tracks });
  }

  componentDidMount() {
    FirebaseRef.child('playlist').on('value', this.onPlaylistChange.bind(this));
    this.unsubscribe = PlaylistStore.listen(this.onTracksChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('playlist').off('value', this.onPlaylistChange.bind(this));
    this.unsubscribe();
  }

  render() {

    let tracks = '';
    if(!_.isEmpty(this.state.tracks)) {
      tracks = this.state.tracks.map((track, index) => {
        return <Track key={index} track={track} />
      });
    }

    return (
      <div>
        <Table hover>
          <caption>{this.state.playlistName}</caption>
          <thead>
            <tr>
              <th width="30">#</th>
              <th>Track</th>
              <th>Album</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {tracks}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default PlaylistContainer;
