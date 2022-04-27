<template>
  <div class="container admin price-rules">
    <vue-query-builder :rules="rules" :maxDepth="3"></vue-query-builder>
  </div>
</template>
<script>
  import VueQueryBuilder from 'vue-query-builder';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'AdminPriceRules',

    components: { VueQueryBuilder },



    computed: {
      ...mapGetters({
        rules: 'getRules'
      })
    },

    methods: {
    }
  }
</script>
<style></style>
