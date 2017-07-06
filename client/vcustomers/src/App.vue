<template>
  <body>
    <customer-area v-if="inCustomerArea()"></customer-area>
    <admin-area v-else></admin-area>
    <customer-footer class="bg-inverse" v-if="inCustomerArea()"></customer-footer>
  </body>
</template>
<style>
</style>
<script>
import CustomerArea from './components/areas/CustomerArea.vue';
import AdminArea from './components/areas/AdminArea.vue';
import CustomerFooter from "./components/areas/navs/CustomerFooter.vue";

export default {
  components: {
    CustomerFooter,
    CustomerArea, AdminArea
  },

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
<style lang="less">
  @import '~element-ui/lib/theme-default/index.css';
</style>
