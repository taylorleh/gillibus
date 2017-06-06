<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>
<style>

</style>
<script>
  import NavBar from './components/NavBar.vue';
  export default {
    sockets: {
      connect() {
        console.log('%cSOCKET CONNECT: ADMIN-APP>VUE', 'color:green');
      },
      disconnect() {
        console.log('%cSOCKET DISCONNECT: ADMIN-APP>VUE', 'color:red; font-weight:700;');
      }
    },
    components: {  NavBar }
  }
</script>
