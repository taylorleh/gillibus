<template>
  <div>
    <customer-nav-bar></customer-nav-bar>
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import CustomerNavBar from './navs/CustomerNav.vue'
  import Notifications from "../CustomerNotifications.vue";

  export default {
    name: 'CustomerArea',

    components: { CustomerNavBar, Notifications },

    created() {
      console.log('IN CUSTOMER')
    }
  }
</script>
<style lang="less">

</style>
