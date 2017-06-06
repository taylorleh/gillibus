<template>
  <div class="container">
    <section class="form-wrap" style="margin-top: 20%;">
      <!--<form name="adminLogin">-->
      <div class="form-group">
        <label for="adminEmailInput">Email address</label>
        <input v-model="email" type="email" class="form-control" id="adminEmailInput" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="adminPassInput">Password</label>
        <input required type="password" v-model="password" class="form-control" id="adminPassInput" placeholder="Password">
      </div>
      <button @click="login" class="btn btn-primary">Login</button>
    </section>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import axios from 'axios';
  window.axios = axios;

  let instance = axios.create();

  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = window.sessionStorage.getItem('com.gillibus');
    console.log('AXIOS-INTERCEPTORS: REQUEST', config);
    if (token) {
      config.headers.common['Authorization'] = token;
    }
    console.dir(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  instance.interceptors.response.use(function (response) {
    // Do something with response data
    console.log('AXIOS-INTERCEPTORS', response.data.token);

    console.dir(response);

    const token = response.data.token;
    if (token) {
      let INCORRECT = 'akdjflashjdf.askdjksafjsda.asdfasdfsdf';
      window.sessionStorage.setItem('com.gillibus', token);
//      document.cookie = `X-Access-Token=${INCORRECT}`;
    }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  export default {
    name: 'AdminLogin',

    data() {
      return {
        email: '',
        password: ''
      }
    },

    computed: {},

    methods: {
      login() {
        instance.post('/api/v1/admin/login', {
            username: this.email,
            password: this.password
          })
          .then(res => {
            console.log(`GOT RESPONSE ${JSON.stringify(res.data.token)}`);
//            this.$localStorage.set('com.gillibus', res.data.token);
//            axios.defaults.headers.common['x-access-token'] = res.data.token;
//            document.cookie = `x-access-control=${res.data.token}`;
            window.location.href = `/portal`;
//            this.navigateToPortal();
          })
          .catch(error => {
            console.error('error', error);
          })
      },

      navigateToPortal() {
        instance.get('/portal')
          .then(response => {
            console.log('asked for login and got ', response);
          })
          .catch(error => {
            console.error(`tried naving to portal `, error);
          })

      }
    },

    created() {
      console.log(`created ${this.email}`);
    }
  }
</script>
<style></style>
