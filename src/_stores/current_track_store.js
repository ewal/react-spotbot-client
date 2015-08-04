import Reflux from 'reflux';
import Actions from '_actions/current_track_actions';

/**
 * Current Track store module
 * @module _stores/current_track_store
 */

let Store = Reflux.createStore({

  listenables: Actions,

  init() {
    this.track = {};
  },

  onSetCompleted(track) {
    this.track = track;
    this.trigger();
  },

  onSetFailed(message) {
    console.log(message);
  },

  get() {
    return this.track;
  }

});

export default Store;
