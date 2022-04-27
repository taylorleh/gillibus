/**
 * Created by taylor on 6/16/17.
 */

import axios from 'axios';
import { router } from '../../main';

let instance = axios.create({
  baseURL: `${document.location.origin}/api/v1/admin`
});

instance.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem('com.gillibus');
  if (token) {
    config.headers.common['Authorization'] = token;
  } else {
    console.warn('Cannot send auth token with request');
  }
  return config;
});

instance.interceptors.response.use(function(response) {
  return response;
}, function({ response }) {
  if (response.status === 401) {
    router.replace({name: 'admin'})
  }
  return Promise.reject(response);
});


export default instance;

