import Reflux from 'reflux';
import Actions from '_actions/playlist_actions';

let Store = Reflux.createStore({
  listenables: Actions,

  onLoad() {
    console.log("LOADED");
  },

  onLoadCompleted(response) {
    this.trigger(response);
  },

  onLoadFailed(response) {
    console.log("ALL WENT TO HELL!!!!!");
  }
});

export default Store;
