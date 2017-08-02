/**
 * Created by taylor on 6/9/17.
 */

import Vue from 'vue';
const digitsRE = /(\d{3})(?=\d)/g;

Vue.filter('currency', function(value, sign) {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) {
    return '';
  }
  sign = sign || '$';
  var s = Math.floor(Math.abs(value)).toString(),
    i = s.length % 3,
    h = i > 0
      ? (s.slice(0, i) + (s.length > 3 ? ',' : ''))
      : '',
    v = Math.abs(parseInt((value * 100) % 100, 10)),
    f = '.' + (v < 10 ? ('0' + v) : v);
  return (value < 0 ? '-' : '') +
    sign + h + s.slice(i).replace(digitsRE, '$1,') + f
});


Vue.filter('pad', function(value) {
  if(Number(value) / 10 <= 1) {
    return ['0', value].join('');
  }
  return value;
});


