import Vue from 'vue';
import * as config from '../config';
import store from '../vuex/store';
import router from '../router';
import '../directives';

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'VLess/index.less';

require('!file-loader?name=[name].[ext]&outputPath=/vcustomers/dist/!../assets/images/favicon.ico');

// PLUGINS
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
import * as VueGoogleMaps from 'vue2-google-maps';
import { Card } from 'vue-stripe-elements';
import VueLocalStorage from 'vue-localstorage';
import ElementUI from 'element-ui'
import VueAnalytics from 'vue-analytics';


// REGISTRATION
Vue.use(VueAnalytics, {
  id:'UA-98508717-1',
  router
});

Vue.use(ElementUI);
Vue.component('card', Card);
Vue.use(VueSocketio, socketio(config.CUSTOMER_SOCKET), store);
Vue.use(VueLocalStorage);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAirP89osWYJpZQPOuUrCeFaO2kF3NS9eA',
    v: '3',
    libraries: 'geometry'
  }
});
