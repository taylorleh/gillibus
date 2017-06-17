<template>
  <div>
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
        console.log('%cSOCKET CONNECT: ADMIN-APP>VUE', 'color:green');
      },
      disconnect() {
        console.log('%cSOCKET DISCONNECT: ADMIN-APP>VUE', 'color:red; font-weight:700;');
      }
    },
    components: {
      Notifications,
      AdminNavBar
    }
  }
</script>
<style>
  @import '~element-ui/lib/theme-default/index.css';
</style>
