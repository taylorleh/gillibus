/**
 * Created by taylor on 5/16/17.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';


// OFFICIAL
import App from './App.vue';
import { routes } from './routes';
import store from './vuex/store';

import './config';
import './plugins';

// ADD PLUGINS
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
});

