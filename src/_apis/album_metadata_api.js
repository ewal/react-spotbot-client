import request from 'superagent';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

/**
 * Album metadata api module
 * @module _apis/album_metadata_api
 */

export default {

  /**
   * Fetch information for a single album
   * @param {string} albumId - An album id
   */
  album(albumId) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'album_' + albumId,
          cacheItem = CacheStore.get(cacheKey);

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

  /**
   * Fetch information for several albums
   * @param {array} albumIds - List of album ids
   */
  albums(albumIds) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'albums_' + albumIds.join(''),
          cacheItem = CacheStore.get(cacheKey),
          uniqeIds = _.uniq(albumIds),
          arrs = _.chunk(uniqeIds, 20),
          obj = { albums: [] };

      if(!_.isUndefined(cacheItem)) {
        return resolve(cacheItem.data);
      }

      arrs.forEach((arr) => {
        this.fetch(arr.join(',')).then((response) => {
          obj.albums = _.union(obj.albums, response.albums);
          if(uniqeIds.length === obj.albums.length) {
            CacheStore.set(cacheKey, obj);
            resolve(obj);
          }
        });
      });

    });
  },

  fetch(ids) {
    return new Promise((resolve, reject) => {
      request.get('https://api.spotify.com/v1/albums/')
      .query({ ids: ids })
      .end((error, response) => {
        if(response.ok) {
          resolve(response.body);
        }
        else {
          reject(response.text);
        }
      });
    });
  }
};
