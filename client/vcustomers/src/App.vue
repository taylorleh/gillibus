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
import { mapActions, mapGetters } from 'vuex';
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

  computed: {
    ...mapGetters(['USE_SERVICES'])
  },

  methods: {
    ...mapActions(['setEnvironmentMode', 'setServiceUsage']),

    inCustomerArea() {
      return this.$route.path.split('/').indexOf('portal') === -1;
    }
  },

  created() {
    if (process.env.NODE_ENV) {
      this.setEnvironmentMode(process.env.NODE_ENV);
    } else {
      console.warn('Could not set environment mode');
    }

    if (process.env.USE_SERVICES) {
      this.setServiceUsage((process.env.USE_SERVICES === 'on'));
    } else {
      console.warn('Could not set environment mode');
    }
    let me = this;

    window.toggleServices = () => {
      me.setServiceUsage(!me.USE_SERVICES);
    }
  }
}
</script>
<style lang="less">
  @import '~element-ui/lib/theme-default/index.css';
</style>
