import _ from 'lodash';

let CacheStore = {

  cache: [],

  getStore() {
    return this.cache;
  },

  get(cacheKey) {
    return _.findWhere(this.cache, { key: cacheKey });
  },

  set(key, data) {
    this.cache.push({ key: key, data: data });
  }

};

export default CacheStore;
