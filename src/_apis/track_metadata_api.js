import request from 'superagent';
import utils from 'utils';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

/**
 * Track metadata api module
 * @module _apis/track_metadata_api
 */

/*
 * Since we can't fetch a playlist without authentication
 * we must fetch meta information directly from the tracks.
 * The Spotify web apis limit is 50 tracks per request
 */
export default {

  isFetching: false,

  /**
   * Fetch information for a single track
   * @param {string} trackId - A track id
   */
  track(trackId) {
    // The spobot server will update currentTrack twice causing two requests to Spotifys api.
    // Prevent by testing that we already are fetching.
    // Since we use a promise we need to resolve or reject something.

    return new Promise((resolve, reject) => {
      if(this.isFetching) {
        // Return an empty object and let the component handle it.
        return resolve({});
      }

      this.isFetching = true;
      let cacheKey = 'track_' + trackId;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        this.isFetching = false;
        return resolve(findInCache.data);
      }

      request.get('https://api.spotify.com/v1/tracks/' + trackId)
      .end((error, response) => {
        this.isFetching = false;
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
   * Fetch information for several tracks
   * @param {array} trackIds - List of track ids
   */
  tracks(trackIds) {

    return new Promise((resolve, reject) => {

      let cacheKey = 'track_' + trackIds.join('');
      let findInCache = CacheStore.get(cacheKey);

      if(!_.isUndefined(findInCache)) {
        return resolve(findInCache.data);
      }

      let params = {
        ids: _.take(trackIds, 50).join(',')
      };

      request.get('https://api.spotify.com/v1/tracks/')
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
