import Reflux from 'reflux';

/**
 * Search store module
 * @module _stores/search_store
 */

let Store = Reflux.createStore({

  init() {
    this.navigateObj = {};
  },

  setNavigateObject(obj) {
    this.navigateObj = obj;
  },

  gGetNavigateObject() {
    return this.navigateObj;
  }
});

export default Store;
