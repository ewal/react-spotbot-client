import Reflux from 'reflux';
import Actions from '_actions/queue_actions';
import _ from 'lodash';

/**
 * Queue store module
 * @module _stores/queue_store
 */

let Store = Reflux.createStore({

  listenables: Actions,

  init() {
    this.queue = [];
  },

  onSetCompleted(queue) {
    this.queue = queue;
    this.trigger();
  },

  onSetFailed(message) {
    throw new Error(message);
  },

  get() {
    return this.queue;
  }

});

export default Store;
