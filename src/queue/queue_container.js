import React from 'react';
import { Table } from 'react-bootstrap';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import Track from 'components/track_table_row';
import TableHeader from 'components/track_table_header';
import TrackMetadataApi from '_apis/track_metadata_api';
import utils from 'utils';
import QueueStore from '_stores/queue_store';

class QueueContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    };
  }

  componentDidMount() {
    this.unsubscribe = QueueStore.listen(this.onQueueChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onQueueChange() {
    this.setState({ tracks: QueueStore.get().tracks });
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
