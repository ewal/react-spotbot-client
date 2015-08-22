import Reflux from 'reflux';
import CurrentTrackActions from '_actions/current_track_actions';

/**
 * Search store module
 * @module _stores/current_track_store
 */

let Store = Reflux.createStore({

  listenables: CurrentTrackActions,

  init() {
    this.info = {
      currentTrack: {},
      startedAt: null,
      isPlaying: false
    };
  },

  get() {
    return this.info;
  },

  getTrack() {
    return this.info.currentTrack;
  },

  onSetStatus(data) {
    this.info.startedAt = data.startedAt;
    this.info.isPlaying = data.isPlaying;
  },

  onLoadCompleted(track) {
    // Sometimes the result back is a bit messy...
    if(!_.isUndefined(track.tracks)) {
      this.info.currentTrack = track.tracks[0];
    }
    else {
      this.info.currentTrack = track;
    }
    this.trigger();
  },

  onLoadFailed(message) {
    throw new Error(message);
  }

});

export default Store;
