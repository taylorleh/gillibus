<template></template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ConditionBuilderRule',

    props: {
      rules:{
        required: true,
        type: Array
      }
    },

    data() {
      return {
        depth: 1,

        query: {
          logicalOperator: "All",
          children: []
        },


      }
    },

    computed: {},

    methods: {}

  }
</script>
<style></style>
