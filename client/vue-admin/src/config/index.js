/**
 * Created by taylor on 6/6/17.
 */

import axios from 'axios';
axios.defaults.headers.common['Authorization'] = window.sessionStorage['com.gillibus'];



axios.interceptors.response.use(function (response) {
  const token = response.data.token;
  if (token) {
    window.sessionStorage.setItem('com.gillibus', token);
  }
  return response;
}, function (error) {
  if(error.response.status === 401) {
    window.location.href = '/admin';
  } else {
    return Promise.reject(error);
  }
});
