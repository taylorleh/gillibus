<template></template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'VConditionBuilder',


    props: ['COMP_PROPS'],
    computed: {
      ...mapGetters()
    },
    methods: {
      ...mapActions()
    }
  }
</script>
<style></style>
