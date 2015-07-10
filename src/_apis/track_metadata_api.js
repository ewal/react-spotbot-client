import request from 'superagent';
import utils from 'utils';
import _ from 'lodash';

export default {
  // Accepts string or an array of Spotify Uris
  fetch(data) {

    return new Promise((resolve, reject) => {

      let uris = [];

      if(_.isString(data)) {
        uris.push(data);
      }
      else {
        uris = data;
      }

      let trackIds = uris.map(uri => {
        return utils.parseSpotifyId(uri);
      });

      request.get('https://api.spotify.com/v1/tracks/').query({ ids: _.take(trackIds, 50).join(',')})
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
