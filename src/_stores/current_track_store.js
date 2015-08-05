import Reflux from 'reflux';
import Actions from '_actions/current_track_actions';
import _ from 'lodash';

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
    // TODO:
    // Some major bug in spotbot server. Somethimes we get an object, sometimes an array.
    // Write a test for this and or fix in it spotbot server.
    if(_.keys(track).length === 1) {
      this.track = track.tracks[0];
    }
    else {
      this.track = track;
    }
    this.trigger();
  },

  onSetFailed(message) {
    throw new Error(message);
  },

  get() {
    return this.track;
  }

});

export default Store;
