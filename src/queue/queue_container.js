import React from 'react';
import FirebaseRef from 'firebase_ref';
import _ from 'lodash';
import TrackMetadataApi from '_apis/track_metadata_api';
import utils from 'utils';
import TrackList from 'track/track_list';

class QueueContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    };
  }

  componentDidMount() {
    FirebaseRef.child('queue').on('value', this.onQueueChange.bind(this));
  }

  componentWillUnmount() {
    FirebaseRef.child('queue').off('value', this.onQueueChange.bind(this));
  }

  onQueueChange(snapshot) {
    let val = snapshot.val();
    if(_.isNull(val)) {
      this.setState({ tracks: [] });
    }
    else {
      let data = _.toArray(val);
      let trackIds = data.map((item) => {
        return utils.spotify.parseId(item.uri);
      });
      TrackMetadataApi.tracks(trackIds)
      .then((response) => {
        this.setState({ tracks: response.tracks });
      })
      .catch((message) => {
        throw new Error(message);
      });
    }
  }

  render() {

    let queue = <p>Queue is empty</p>;
    if(!_.isEmpty(this.state.tracks)) {
      queue = <TrackList tracks={this.state.tracks} artist image album header />;
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
