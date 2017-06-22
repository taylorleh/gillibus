/**
 * Created by taylor on 5/24/17.
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';
import './plugins';
import './filters';

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

export { app, store, router };
