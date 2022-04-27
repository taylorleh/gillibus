<template>
  <div class="wrapper bg-main">
    <customer-nav-bar></customer-nav-bar>
    <notifications></notifications>
    <router-view class="main"></router-view>
  </div>
  <!--<customer-footer class="bg-inverse"></customer-footer>-->
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomerNavBar from './navs/CustomerNav.vue'
import Notifications from "../CustomerNotifications.vue";
import CustomerFooter from "./navs/CustomerFooter.vue";

export default {
  name: 'CustomerArea',

  components: {
    CustomerFooter,
    CustomerNavBar, Notifications
  },

  created() {
    if (this.$socket.nsp !== '/customer') {
      this.$socket.nsp = '/customer';
    }

    if (!this.$socket.connected) {
      this.$socket.connect();
    }

  }
}
</script>
<style lang="scss">
  @import '~styles/variables';

  html, body {
    height: 100%;
  }

  .wrapper {
    min-height: 100%;
    height: auto;
    margin: 0 auto -70px;
    padding-bottom: 100px;
  }


  html {
    font-size: 14px;
  }

  @include media-breakpoint-up(md) {
    html {
      font-size: 16px;
    }
  }

/*  @include media-breakpoint-up(md) {
    html {
      font-size: 20px;
    }
  }

  @include media-breakpoint-up(lg) {
    html {
      font-size: 28px;
    }
  }*/


</style>
