/**
 * Created by taylor on 5/24/17.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import { routes } from './routes';
import store from './vuex/store';
import './plugins';
import './filters';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

//
// console.log('PROCESS = ', process);
// if(process.env.NODE_ENV) {
//   console.log('node env ', process.env.NODE_ENV)
// }
// let hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');
// hotClient.subscribe(function (event) {
//   if (event.action === 'reload') {
//     window.location.reload(true)
//   }
// });
