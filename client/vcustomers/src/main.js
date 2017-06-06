/**
 * Created by taylor on 5/24/17.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App.vue';
import { routes } from './routes';
import store from './vuex/store';
import './plugins';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = '/api/v1';

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
