import request from 'superagent';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

export default {

  artist(artistId) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'artist_' + artistId;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        return resolve(findInCache.data);
      }

      request.get('https://api.spotify.com/v1/artists/' + artistId)
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

  singles(artistId) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'artist_singles_' + artistId;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        return resolve(findInCache.data);
      }

      let params = {
        album_type: 'single',
        market: process.env.SPOTIFY_MARKET,
        limit: 5
      };

      request.get('https://api.spotify.com/v1/artists/' + artistId + '/albums')
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
  },

  albums(artistId) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'artist_albums_' + artistId;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        return resolve(findInCache.data);
      }

      let params = {
        album_type: 'album',
        market: process.env.SPOTIFY_MARKET,
        limit: 50
      };

      request.get('https://api.spotify.com/v1/artists/' + artistId + '/albums')
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
  },

  topTracks(artistId) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'top_tracks_' + artistId;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        return resolve(findInCache.data);
      }

      let params = {
        country: process.env.SPOTIFY_MARKET
      };

      request.get('https://api.spotify.com/v1/artists/' + artistId + '/top-tracks')
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
