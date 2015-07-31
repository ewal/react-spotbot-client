import Reflux from 'reflux';
import _ from 'lodash';

/**
 * Cache store module
 * @module _stores/cache_store
 */

let CacheStore = Reflux.createStore({

  init() {
    this.cache = [];
  },

  getStore() {
    return this.cache;
  },

  get(cacheKey) {
    return _.findWhere(this.cache, { key: cacheKey });
  },

  set(key, data) {
    this.cache.push({ key: key, data: data });
  }

});

export default CacheStore;
