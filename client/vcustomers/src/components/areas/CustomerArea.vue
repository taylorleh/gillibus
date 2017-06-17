<template>
  <div>
    <customer-nav-bar></customer-nav-bar>
    <router-view></router-view>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import CustomerNavBar from './navs/CustomerNav.vue'

  export default {
    name: 'CustomerArea',

    components: { CustomerNavBar },

    created() {
      console.log('IN CUSTOMER')
    }
  }
</script>
<style lang="less">

</style>
