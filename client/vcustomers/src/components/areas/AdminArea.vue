<template>
  <div class="wrapper admin bg-main pb-0">
    <admin-nav-bar></admin-nav-bar>
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>
<style>
</style>
<script>
import AdminNavBar from './navs/AdminNavBar.vue';
import Notifications from "../CustomerNotifications.vue";

export default {
  sockets: {
    connect() {
      console.log('%cADMIN SOCKET CONNECT: ADMIN-APP>VUE', 'color:green');
    },
    disconnect() {
      console.log('%cADMIN SOCKET DISCONNECT: ADMIN-APP>VUE', 'color:red; font-weight:700;');
    }
  },

  components: {
    Notifications,
    AdminNavBar
  },

  created() {
    this.$socket.nsp = '/driver';
  },

  destroyed() {
    if (this.sockets.connected) {
      this.sockets.disconnect();
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
</style>
