/**
 * Created by taylor on 6/6/17.
 */

import axios from 'axios';

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status === 401) {
    window.sessionStorage.removeItem('com.gillibus');
    window.location.href = '/admin';
  } else {
    return Promise.reject(error);
  }
});

axios.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem('com.gillibus');
  if (token) {
    config.headers.common['Authorization'] = token;
  } else {
    console.warn('Cannot send auth token with request');
  }
  return config;
});
