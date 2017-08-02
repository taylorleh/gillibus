/**
 * Created by taylor on 5/24/17.
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';
import './plugins';
import './filters';
import './directives';

const app = new Vue({
  el: 'body',
  router,
  replace: false,
  store,
  render: h => h(App)
});

export { app, store, router };
