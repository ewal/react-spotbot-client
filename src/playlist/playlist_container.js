import React from 'react';
import { Table } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import Track from 'components/track_table_row';

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
    let val = snapshot.val();
    if(!_.isNull(val)) {
      TrackMetadataApi.fetch(val.tracks).then((response) => {
        this.setState({
          playlistName: val.name,
          tracks: response.tracks
        });
      }).catch(() => {
        console.log("Couldn't fetch metadata");
      });
    }
  }

  onTracksChange(response) {
    this.setState({ tracks: response.tracks });
  }

  componentDidMount() {
    FirebaseRef.child('playlist').on('value', this.onPlaylistChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('playlist').off('value', this.onPlaylistChange.bind(this));
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
