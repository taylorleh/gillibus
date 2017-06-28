<template>
  <div :class="{'loading': loading}" class="container">
    <section class="form-wrap" style="margin-top: 20%;">
      <div class="form-group">
        <label for="adminEmailInput">Email address</label>
        <input v-model="email" type="email" class="form-control" id="adminEmailInput" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="adminPassInput">Password</label>
        <input required type="password" v-model="password" class="form-control" id="adminPassInput" placeholder="Password">
      </div>
      <button :disabled="loading" @click="login" class="btn btn-primary">Login</button>
    </section>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import { Loading } from 'element-ui';
  import api from '../../api/adminLoginResource';

  export default {
    name: 'AdminLogin',

    data() {
      return {
        email: '',
        password: '',
        loading: false
      }
    },

    computed: {},

    methods: {
      ...mapActions(['addMessage']),

      login() {
        this.loading = true;
        let overlay = Loading.service({
          text: 'Logging in...',
          customClass: 'purchase-overlay'
        });

        api.post('/login', {
            username: this.email,
            password: this.password
          })
          .then(res => {
            this.loading = false;
            overlay.close();
            this.$router.push({ name: 'adminHome'})
          })
          .catch(error => {
            this.loading = false;
            overlay.close();
            let func = this.addMessage;
            this.addMessage({
              type: 'error',
              title: 'Invalid login',
              description: 'username and password are not valid.'
            });
            console.error('error', error);
          })
      },
    },

    created() {
    }
  }
</script>
<style></style>
