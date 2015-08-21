import Reflux from 'reflux';
import request from 'superagent';
import TrackMetadataApi from '_apis/track_metadata_api';

let Actions = Reflux.createActions({
  'load': {
    children: ['completed', 'failed']
  },
  'setStatus': {}
});


Actions.load.listen((args)=> {
  TrackMetadataApi.track(args)
    .then(Actions.load.completed)
    .catch(Actions.load.failed);
});

export default Actions;
