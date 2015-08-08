import Reflux from 'reflux';
import TrackMetadataApi from '_apis/track_metadata_api';

let QueueActions = Reflux.createActions({
  'set': {
    children: ['completed', 'failed']
  }
});

QueueActions.set.listen((trackIds) => {
  TrackMetadataApi.tracks(trackIds)
  .then(QueueActions.set.completed)
  .catch(QueueActions.set.failed);
});

export default QueueActions;
