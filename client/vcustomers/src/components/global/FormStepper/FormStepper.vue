<!--<template>-->
<!--<div class="d-flex w-50 justify-content-around">-->
<!--<slot @addStep="addStep" class="bg-black"></slot>-->
<!--</div>-->
<!--</template>-->
<script>
import { mapGetters, mapActions } from 'vuex';
import Vue from 'vue';

let separatorConfig = {
  'class': {
    'w-75': true,
    'align-self-center': true
  },
  domProps: {
    innerHTML: '&nbsp;'
  },
  style: {
    height: '2px',
    backgroundColor: '#4096E7'
  }
};


export default {

  name: 'FormStepper',

  props: {
    activeStep: {
      type: Number,
      default: 0
    },

    stepOptions: {
      type: [Array, Object],
      required: true
    }
  },

  computed: {
    currentStepIndex() {

    },

    currentStepName() {
      return this.stepOptions[this.activeStep];
    }
  },


  methods: {
    addStep() {
      console.log('new step');
    }
  },

  render(h) {
    let ctxCount = 0;

    return h('div', {
      'class': {
        'd-flex': true,
        'justify-content-around': true,
        'w-50': true
      }
    }, this.$slots.default.map((e,i) => {
      if (e.componentOptions) {
        e.componentOptions.propsData.activeStepIndex = this.activeStep;
        e.componentOptions.propsData.ctxIndex = ctxCount++;
      }
      return e;
    }));
  }
}
</script>
<style lang="scss">

.dis-none {
  visibility: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0
}
</style>
