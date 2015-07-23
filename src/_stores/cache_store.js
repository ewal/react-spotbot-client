import Reflux from 'reflux';
import _ from 'lodash';

let CacheStore = Reflux.createStore({

  init() {
    this.cache = [];
  },

  getStore() {
    return this.cache;
  },

  // TODO: use _.findWhere instead
  get(cacheKey) {
    return (_.filter(this.cache, (item) => {
      return item.key === cacheKey;
    }))[0];
  },

  set(key, data) {
    this.cache.push({ key: key, data: data });
  }

});

export default CacheStore;
