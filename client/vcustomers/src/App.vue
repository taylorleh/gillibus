<template>
  <div>
    <customer-nav v-if="!($route.name === 'admin')"></customer-nav>
    <router-view></router-view>
  </div>
</template>
<style>
</style>
<script>
  import CustomerNav from './components/CustomerNav.vue';
  export default {
    sockets: {
      connect() {

      }
    },
    components: { CustomerNav }
  }
</script>
