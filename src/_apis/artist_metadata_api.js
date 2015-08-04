import request from 'superagent';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

/**
 * Artist metadata api module
 * @module _apis/artist_metadata_api
 */

export default {

  /**
   * Information about an artist
   * @param {string} artistId - An artist id
   */
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

  /**
   * Information about an artist singles
   * @param {string} artistId - An artist id
   */
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

  /**
   * Information about an artist albums
   * @param {string} artistId - An artist id
   */
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

  /**
   * Information about an artist top tracks
   * @param {string} artistId - An artist id
   */
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
  },

  /**
   * Information about an artist related artists
   * @param {string} artistId - An artist id
   */
  relatedArtists(artistId) {
    return new Promise((resolve, reject) => {

      let cacheKey = 'related_artists_' + artistId;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        return resolve(findInCache.data);
      }

      let params = {
        country: process.env.SPOTIFY_MARKET
      };

      request.get('https://api.spotify.com/v1/artists/' + artistId + '/related-artists')
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
