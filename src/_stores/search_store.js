import Reflux from 'reflux';

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
