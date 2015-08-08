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

  isLoading: false,
  /**
   * Fetch information for a single track
   * @param {string} trackId - A track id
   */
  track(trackId) {

    return new Promise((resolve, reject) => {

      if(this.isLoading) {
        return resolve({});
      }

      this.isLoading = true;
      let cacheKey = 'track_' + trackId;
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        this.isLoading = false;
        return resolve(findInCache.data);
      }

      request.get('https://api.spotify.com/v1/tracks/' + trackId)
      .end((error, response) => {
        if(response.ok) {
          this.isLoading = false;
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
