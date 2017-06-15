/**
 * Created by taylor on 6/15/17.
 */
import axios from 'axios';

let instance = axios.create({
  baseURL: `${document.location.origin}/api/v1/admin`
});

instance.interceptors.response.use(function (response) {
  const token = response.data.token;
  if (token) {
    window.sessionStorage.setItem('com.gillibus', token);
  } else {
    console.warn('Did not receive token from login attempt')
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


export default instance;
