/**
 * Created by taylor on 6/22/17.
 */

import Vue from 'vue';
import moment from 'moment';

Vue.directive('format-date', {
  inserted: function (el) {
    console.log('FORMAT DATE', arguments);
  },

  update: function(el) {
    console.log('UPDATE', el);
  },

  componentUpdated(el) {
    console.log('COMP UPDATE', el.innerHTML);
  }
});
