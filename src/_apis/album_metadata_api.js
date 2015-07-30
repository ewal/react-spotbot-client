import request from 'superagent';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

export default {
  album(albumId) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'album_' + albumId;
      let cacheItem = CacheStore.get(cacheKey);
      if(!_.isUndefined(cacheItem)) {
        return resolve(cacheItem.data);
      }

      request.get('https://api.spotify.com/v1/albums/' + albumId)
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

  albums(albumIds) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'albums_' + albumIds;
      let cacheItem = CacheStore.get(cacheKey);
      if(!_.isUndefined(cacheItem)) {
        return resolve(cacheItem.data);
      }

      let params = {
        ids: albumIds.join(',')
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
