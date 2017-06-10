/**
 * Created by taylor on 6/10/17.
 */
import Vue from 'vue';
import * as config from '../util/config';
import store from '../vuex/store';

import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';



Vue.use(VueSocketio, socketio(config.DRIVER_SOCKET), store);
