import request from 'superagent';
import utils from 'utils';
import _ from 'lodash';
import CacheStore from '_stores/cache_store';

export default {
  fetch(id) {
    return new Promise((resolve, reject) => {

      let findInCache = CacheStore.get(id);
      if(!_.isUndefined(findInCache)) {
        return resolve(findInCache.data);
      }

      request.get('https://api.spotify.com/v1/albums/' + id)
      .end((error, response) => {
        if(response.ok) {
          CacheStore.set(id, response.body);
          resolve(response.body);
        }
        else {
          reject(response.text);
        }
      });
    });
  }
};
