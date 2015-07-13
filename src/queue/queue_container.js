import React from 'react';
import { Table } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import Track from 'components/track_full_table_row';

import TrackMetadataApi from '_apis/track_metadata_api';

// TODO:
// Cache tracks. don't use the API if not needed

class QueueContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    };
  }

  onQueueChange(snapshot) {
    let val = _.toArray(snapshot.val());
    let uris = _.pluck(val, 'uri');

    if(!_.isNull(uris)) {
      TrackMetadataApi.fetch(uris).then((response) => {
        this.setState({
          tracks: response.tracks
        });
      }).catch((message) => {
        throw new Error(message);
      });
    }
  }

  componentDidMount() {
    FirebaseRef.child('queue').on('value', this.onQueueChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('queue').off('value', this.onQueueChange.bind(this));
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

export default QueueContainer;
