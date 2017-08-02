<template>
  <section class="d-flex timepicker flex-column w-100 p-2" @click.stop>
    <div class="w-100 d-flex m-auto justify-content-around align-items-center p-2">
      <div class="d-flex flex-column align-items-center h-100 justify-content-around">
        <button @click="incHour" :disabled="isTopHour()" class="btn btn-outline-primary btn-sm">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
        <span>{{ hour }}</span>
        <button @click="decHour" :disabled="isBottomHour()" class="btn btn-outline-primary btn-sm">
          <i class="fa fa-arrow-down" aria-hidden="true"></i>
        </button>
      </div>

      <div class="align-self-center">:</div>

      <div class="d-flex flex-column align-items-center h-100 justify-content-around">
        <button @click="incMinute" :disabled="isTopHour()" class="btn btn-outline-primary btn-sm">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
        <span>{{ minute | pad }}</span>
        <button @click="decMinute" :disabled="isBottomMinute()" class="btn btn-outline-primary btn-sm">
          <i class="fa fa-arrow-down" aria-hidden="true"></i>
        </button>
      </div>

      <div class="align-items-center d-flex">
        <button @click="changeMeridiem()" class="btn btn-primary btn-sm">{{ meridiem }}</button>
      </div>
    </div>

    <div>
      <button @click="closePicker()" class="btn btn-sm btn-block btn-primary">Ok</button>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'TimePicker',

  componentName: 'TimePicker',

  props: {

    initialTime: {
      type: String
    },

    minHour: {
      type: Number
    },

    maxHour: {
      type: Number
    },

    minuteStep: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      rawHour: this.minHour,
      minute: 0
    }
  },

  computed: {
    hour() {
      if(this.rawHour < this.minHour) {
        this.rawHour = this.minHour;
      }
      return moment().hour(this.rawHour).format('hh');
    },

    meridiem() {
      return moment().hour(this.rawHour).format('A');
    }
  },

  methods: {
    incHour() {
      this.rawHour++;
      if (this.rawHour === this.maxHour) {
        this.minute = 0;
      }
    },

    decHour() {
      if (this.rawHour === this.minHour) {
        this.minute = 0;
      } else {
        this.rawHour--;
      }
    },


    changeMeridiem() {
      if (this.rawHour < 12) {
        this.rawHour = this.maxHour;
      } else {
        this.rawHour = this.minHour;
      }
      this.minute = 0;
    },

    /**
     * Disables the decrement hour button if
     * the minimum hour set by parent would
     * pass this threshold.
     *
     * @return {Boolean}
     */
    isTopHour() {
      return this.maxHour && this.rawHour + 1 > this.maxHour;
    },


    /**
     * Disables the decrement hour button if
     * the minimum hour set by parent would
     * pass this threshold.
     *
     * @return {Boolean}
     */
    isBottomHour() {
      if (this.minute > 0 && this.rawHour === this.minHour) {
        return false;
      }
      return this.minHour && this.rawHour <= this.minHour;
    },

    isBottomMinute() {
      if (this.minute === 0 && this.rawHour === this.minHour) {
        return true;
      }
      return this.minute === 0 && this.rawHour - 1 < this.minHour;
    },

    incMinute() {
      if (this.minute + this.minuteStep >= 60) {
        this.rawHour++;
        this.minute = 0;
      } else {
        this.minute += this.minuteStep;
      }
    },

    decMinute() {
      if (this.minute - this.minuteStep < 0) {
        this.rawHour--;
        this.minute = 60 - this.minuteStep;
      } else {
        this.minute -= this.minuteStep;
      }
    },


    closePicker() {
      this.$emit('picked', {
        hour: this.rawHour,
        minute: this.minute
      });
    }
  },

  created() {
    console.log('datepicker CREATED');
    if(this.minHour) {
      this.rawHour = this.minHour;
    }
    if (this.initialTime) {
      let initial = moment(this.initialTime, 'LT');
      this.rawHour = initial.hours();
      this.minute = initial.minutes();
    }
  },

  /**
   * Emits the chosen time
   * to the parent component
   */
  beforeDestroy() {
    this.$emit('picked', {
      hour: this.rawHour,
      minute: this.minute
    });
  }
}
</script>
<style lang="scss">

.timepicker {
  position: absolute;
  height: 10rem;
  background-color: white;
  z-index: 100;
  border: 1px solid black;
  bottom: calc(-5px - 10rem);
  max-width: 17rem;
}

</style>
