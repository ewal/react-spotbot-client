import request from 'superagent';
import utils from 'utils';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

// TODO:
// - common method for fetching with params
//
export default {

  fetch(id) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'artist_' + id;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        console.log("fetch from cache!");
        return resolve(findInCache.data);
      }

      request.get('https://api.spotify.com/v1/artists/' + id)
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

  albums(id) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'artist_albums_' + id;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        console.log("fetch from cache!");
        return resolve(findInCache.data);
      }

      request.get('https://api.spotify.com/v1/artists/' + id + '/albums')
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

  topTracks(id) {
    // TODO:
    // - pass country from some clever stuff
    return new Promise((resolve, reject) => {

      let cacheKey = 'top_tracks_' + id;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        console.log("fetch from cache!");
        return resolve(findInCache.data);
      }

      request.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=SE')
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
