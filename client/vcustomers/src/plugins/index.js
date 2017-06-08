import Vue from 'vue';
import * as config from '../config';
import store from '../vuex/store';

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'VLess/index.less';



// use: "file-loader?name=[name].[ext]&publicPath=assets/foo/&outputPath=app/images/"
require('!file-loader?name=[name].[ext]&outputPath=/vcustomers/dist/!../assets/images/favicon.ico');

// PLUGINS
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
import * as VueGoogleMaps from 'vue2-google-maps';
import { Card } from 'vue-stripe-elements';
import VueLocalStorage from 'vue-localstorage';


Vue.component('card', Card);


// REGISTRATION
Vue.use(VueSocketio, socketio(config.CUSTOMER_SOCKET), store);
// Vue.component('stripe-checkout', StripeCheckout);
Vue.use(VueLocalStorage);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAirP89osWYJpZQPOuUrCeFaO2kF3NS9eA',
    v: '3',
    libraries: 'geometry'
  }
});
