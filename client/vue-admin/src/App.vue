<template>
  <div>
    <nav-bar></nav-bar>
    <system-notifications></system-notifications>
    <router-view></router-view>
  </div>
</template>
<style>
</style>
<script>
  import NavBar from './components/NavBar.vue';
  import SystemNotifications from "./components/SystemNotifications.vue";

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
      SystemNotifications,
      NavBar
    }
  }
</script>
<style>
  @import '~element-ui/lib/theme-default/index.css';
</style>
