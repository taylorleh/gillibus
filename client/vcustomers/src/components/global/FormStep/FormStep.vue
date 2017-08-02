<template>
  <div class="step">
    <div ref="circle" style="width: 2.5rem;"
      :class="[this.activeStepIndex >= this.ctxIndex  ? 'bg-primary text-white' : 'text-primary bg-white']"
      class="rounded-circle border-primary  justify-content-center d-flex p-2">
      <slot ref="s-title"></slot>
    </div>
    <div class="step-description abs-bottom">
      <slot name="description"></slot>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FormStep',

  props: ['activeStepIndex', 'stepOptions', 'ctxIndex'],

  computed: {},

  methods: {},

  created() {
    this.$emit('addStep');
    this.$parent.$emit('addStep');
  },

  mounted() {
    this.$emit('addStep');
    this.$parent.$emit('addStep');
  }
}
</script>
<style lang="scss">

.step {
  position: relative;

  .step-description {
    position: absolute;
  }
  .abs-bottom {
    position: absolute;
    bottom:calc(0px - 1.5rem);
  }

}

</style>
