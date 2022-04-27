<template></template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CompleteStep',
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
