import _ from 'lodash';

export default {

  spotify: {
    uriType(uri) {
      return uri.split(':')[1];
    },
    parseId(uri) {
      let vals = uri.split(':');
      return _.last(vals);
    }
  },

  date: {
    year(val) {
      return val.split('-')[0];
    }
  },

  formatDuration(ms) {
    ms = parseInt(ms, 10) / 1000;
    var minutes = Math.floor(ms / 60);
    var seconds = Math.floor(ms - (minutes * 60));

    if(minutes < 10){
      minutes = `0${minutes}`;
    }
    if(seconds < 10){
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
};
