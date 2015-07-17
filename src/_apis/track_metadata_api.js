import request from 'superagent';
import utils from 'utils';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

/*
 * Since we can't fetch a playlist without authentication
 * we must fetch meta information directly from the tracks.
 * The Spotify web apis limit is 50 tracks per request
 */
export default {

  isFetching: false,

  fetchTrack(trackId) {
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
        console.log("from CACHE!");
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

  fetchTracks(data) {

    // TODO: consider accepting an ID instead URI
    return new Promise((resolve, reject) => {

      let cacheKey = 'track_' + data.join('');
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        return resolve(findInCache.data);
      }

      if(!_.isArray(data) && !_.isString(data)) {
        return reject("TrackMetadataApi expexted input as string or array");
      }

      let trackIds = data.map(uri => {
        return utils.parseSpotifyId(uri);
      });

      request.get('https://api.spotify.com/v1/tracks/').query({ ids: _.take(trackIds, 50).join(',')})
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
