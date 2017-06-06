/**
 * Created by taylor on 5/16/17.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import * as config from './util/config'


// OFFICIAL
import App from './App.vue';
import { routes } from './routes';
import store from './vuex/store';
// THIRD PARTY
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
// EXTRA
import './less/index.less';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './config';


// ADD PLUGINS
Vue.use(VueRouter);


// THIRD PARTY REGISTER
Vue.use(VueSocketio, socketio(config.DRIVER_SOCKET), store);


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

