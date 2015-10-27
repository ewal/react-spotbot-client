import request from 'superagent';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

/**
 * Search api module
 * @module _apis/search_api
 */

export default {

  /**
   * Search whatever specified in .env SPOTIFY_SEARCH_TYPES
   * @param {string} query - Search query
   */
  search(query) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'search_' + query,
          findInCache = CacheStore.get(cacheKey),
          params = {
            q: query,
            limit: process.env.SPOTIFY_SEARCH_LIMIT,
            market: process.env.SPOTIFY_MARKET,
            type: process.env.SPOTIFY_SEARCH_TYPES
          };

      if(!_.isUndefined(findInCache)) {
        return resolve(findInCache.data);
      }

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
