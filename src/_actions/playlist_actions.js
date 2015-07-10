import Reflux from 'reflux';
import request from 'superagent';
import PlaylistApi from '_apis/playlist_api';

let Actions = Reflux.createActions({
  'load': {
    children: ['completed', 'failed']
  }
});


Actions.load.listen((args)=> {
  PlaylistApi.fetchMetaData(args)
    .then(Actions.load.completed)
    .catch(Actions.load.failed);
});

export default Actions;
