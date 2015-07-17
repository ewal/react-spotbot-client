import React from 'react';
import { Table } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import Track from 'components/track_table_row';
import TableHeader from 'components/track_table_header';

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

    if(!_.isEmpty(val)) {
      TrackMetadataApi.fetchTracks(uris).then((response) => {
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

  renderTable() {
    let tracks = this.state.tracks.map((track, index) => {
      return <Track key={index} index={index} track={track} artist image album />;
    });

    return (
      <Table hover>
        <caption className="sr-only">Songs</caption>
        <TableHeader image artist album index />
        <tbody>
          {tracks}
        </tbody>
      </Table>
    );
  }

  render() {

    let queue = <p>Queue is empty</p>;
    if(!_.isEmpty(this.state.tracks)) {
      queue = this.renderTable();
    }

    return (
      <div className="container-fluid">
        <header className="page-header">
          <h1>Play Queue</h1>
        </header>
        <section>
          {queue}
        </section>
      </div>
    );
  }
};

export default QueueContainer;
