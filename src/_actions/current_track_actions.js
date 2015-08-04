import Reflux from 'reflux';
import TrackMetadataApi from '_apis/track_metadata_api';

let CurrentTrackActions = Reflux.createActions({
  'set': {
    children: ['completed', 'failed']
  }
});


CurrentTrackActions.set.listen((trackId) => {
  TrackMetadataApi.track(trackId)
  .then(CurrentTrackActions.set.completed)
  .catch(CurrentTrackActions.set.failed);
});

export default CurrentTrackActions;
