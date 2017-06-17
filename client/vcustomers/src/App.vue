<template>
  <div>
    <customer-area v-if="inCustomerArea()"></customer-area>
    <admin-area v-else></admin-area>
  </div>
</template>
<style>
</style>
<script>
  import CustomerArea from './components/areas/CustomerArea.vue';
  import AdminArea from './components/areas/AdminArea.vue';

  export default {
    components: { CustomerArea, AdminArea },

    sockets: {
      connect() {}
    },

    methods: {
      inCustomerArea() {
        return this.$route.path.split('/').indexOf('portal') === -1;
      }
    }
  }
</script>
<style>
  @import '~element-ui/lib/theme-default/index.css';
</style>
