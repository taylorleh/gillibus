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
  import api from '../../api/adminLoginResource';

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
        api.post('/login', {
            username: this.email,
            password: this.password
          })
          .then(res => {
            window.location.href = `/portal`;
          })
          .catch(error => {
            console.error('error', error);
          })
      },
    },

    created() {
    }
  }
</script>
<style></style>
