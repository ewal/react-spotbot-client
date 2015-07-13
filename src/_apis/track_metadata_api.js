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
  // Accepts string or an array of Spotify Uris
  fetch(data) {

    // TODO: consider accepting an ID instead URI
    return new Promise((resolve, reject) => {

      let cacheKey = 'track_' + data.join('');
      let findInCache = CacheStore.get(cacheKey);
      if(!_.isUndefined(findInCache)) {
        console.log("fetch from cache!");
        return resolve(findInCache.data);
      }

      if(!_.isArray(data) && !_.isString(data)) {
        return reject("TrackMetadataApi expexted input as string or array");
      }

      let uris = [];


      if(_.isString(data)) {
        // TODO: test of correct spotify uri
        uris.push(data);
      }
      else {
        // TODO: test all spotify uris
        uris = data;
      }

      let trackIds = uris.map(uri => {
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
