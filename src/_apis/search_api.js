import request from 'superagent';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

export default {
  search(query) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'search_' + query;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        console.log("result from cache!");
        return resolve(findInCache.data);
      }

      let params = {
        q: query,
        limit: process.env.SPOTIFY_SEARCH_LIMIT,
        market: process.env.SPOTIFY_MARKET,
        type: process.env.SPOTIFY_SEARCH_TYPES
      };

      request.get('https://api.spotify.com/v1/search').query(params).end((error, response) => {
        if(response.ok) {
          CacheStore.set(cacheKey, response.body);
          resolve(response.body);
        }
        else {
          reject(response.text);
        }
      });

    });
  }
};
