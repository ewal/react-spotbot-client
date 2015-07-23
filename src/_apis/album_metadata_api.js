import request from 'superagent';
import utils from 'utils';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

export default {
  fetch(album_id) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'album_' + album_id;
      let cacheItem = CacheStore.get(cacheKey);
      if(!_.isUndefined(cacheItem)) {
        return resolve(cacheItem.data);
      }

      request.get('https://api.spotify.com/v1/albums/' + album_id)
      .end((error, response) => {
        if(response.ok) {
          CacheStore.set(cacheKey, response.body);
          resolve(response.body);
        }
        else {
          reject(response.text);
        }
      });
    });
  },

  albums(album_ids) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'albums_' + album_ids;
      let cacheItem = CacheStore.get(cacheKey);
      if(!_.isUndefined(cacheItem)) {
        return resolve(cacheItem.data);
      }

      let params = {
        ids: album_ids.join(',')
      };

      request.get('https://api.spotify.com/v1/albums/')
      .query(params)
      .end((error, response) => {
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
