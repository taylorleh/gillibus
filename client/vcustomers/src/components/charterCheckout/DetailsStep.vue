<!--suppress ALL -->
<template>
  <div class="row justify-content-center"> <!-- BEGING BOTTOM CONTAINER -->
    <form v-on:submit.prevent class="col-sm-10 col-xl-7">

      <!-- BUS -->
      <div class="form-group">
        <label for="bus-selection" class="required">Bus</label>
        <select id="bus-selection" v-model="selectedBus" class="form-control custom-select">
          <option v-for="bus in refinedBusChoices"
            :value="bus.value"
            :disabled="bus.disabled">{{ bus.text }}
          </option>
        </select>
      </div>

      <!-- TIME -->
      <section class="row">
        <div class="form-group col-sm">
          <label for="selectStartTime" class="required">Start Time</label>
          <div class="d-flex flex-row-reverse">
            <!--<b-form-select id="selectStartTime" v-model="startTime" :options="startOptions"></b-form-select>-->
            <div class="d-flex w-100 flex-row-reverse position-relative">
              <input @click.stop="openTimePicker('PICKUP')"
                v-model="pickupTime"
                type="text"
                class="form-control"> <i class="fa fa-clock-o d-flex h-100 position-abs align-items-center pr-2"
              aria-hidden="true"></i>
              <time-picker
                @picked="startTimePicked"
                v-if="showPickup"
                :initial-time="pickupTime || null"
                :min-hour="10"
                :max-hour="22"
                :minute-step="15"/>
            </div>
          </div>
        </div>


        <div class="form-group col-sm">
          <label for="selectEndTime" class="required">End Time</label>
          <div class="d-flex flex-row-reverse">
            <div class="d-flex w-100 flex-row-reverse position-relative">
              <input @click.stop="openTimePicker('DROPOFF')"
                :disabled="!pickupTime"
                v-model="dropOffTime"
                type="text"
                class="form-control"> <i class="fa fa-clock-o d-flex h-100 position-abs align-items-center pr-2"
              aria-hidden="true"></i>
              <time-picker
                @picked="endTimePicked"
                v-if="showDropOff"
                :initial-time="dropOffTime || null"
                :min-hour="this.minDropOffTime()"
                :max-hour="22"
                :minute-step="15"/>
            </div>
          </div>
        </div>

      </section>

      <!-- ADDRESS -->
      <div class="form-group">
        <label for="addressInput" class="required">Pickup Address</label>
        <div class="">
          <vue-google-autocomplete
            name="email"
            type="text"
            data-vv-name="address"
            data-vv-scope="scope"
            v-validate:pickupAddress="'required'"
            v-if="this.PRODUCTION || this.USE_SERVICES"
            ref="address"
            id="addressInput"
            classname="form-control"
            placeholder="300 Main Street San Francisco CA"
            @placechanged="getAddressData"
            @blur="checkAddressCompletion"
            @change="checkAddressDate"
            @no-results-found="clearInvalidAddress">
          </vue-google-autocomplete>
          <input v-model="pickupAddress"
            v-validate="'required|email'"
            class="form-control"
            name="email"
            v-else
            type="text">
          <small v-show="errors.has('scope.address')" class="help text-danger">{{ errors.first('scope.address') }}</small>
        </div>
      </div>
      <section class="row justify-content-end">
        <div class="col-sm-4">
          <button @click="nextStep" :disabled="!isDetailsValid" class="btn btn-success btn-block">Continue</button>
          <!--<button @click="nextStep" class="float-right btn btn-success btn-block hidden-sm-up">Continue</button>-->
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { generateTimesArray, busChoices } from 'utils/checkoutUtils';
import moment from 'moment';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import TimePicker from "../global/TimePicker/TimePicker.vue";

let closePickers;

export default {
  name: 'DetailsStep',

  components: {
    TimePicker,
    VueGoogleAutocomplete
  },

  props: {
    isDetailsValid: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      showPickup: false,
      showDropOff: false,
      pickerStartHour: 0,
      pickerStartMinute: 0,
    }
  },

  computed: {
    ...mapGetters({
      durations: 'durations',
      timeBlocks: 'timeBlocks',
      buses: 'busChoices',
      dropOffTime: 'dropOffTime',

      PRODUCTION: 'PRODUCTION',
      USE_SERVICES: 'USE_SERVICES'
    }),

    refinedBusChoices() {
      return [{
        text: 'Please Select A Bus',
        value: '',
        disabled: true
      }].concat(this.buses);
    },

    startOptions() {
      return generateTimesArray(10, 22, 15);
    },

    endOptions() {
      return generateTimesArray(10, 22, 15);
    },


    selectedBus: {
      get() {
        return this.$store.getters.selectedBus;
      },
      set(value) {
        this.setBus(value);
      }
    },

    pickupTime: {
      get() {
        return this.$store.getters.selectedPickupTime;
      },
      set(value) {
        this.setPickup(value);
      }
    },

    dropOffTime: {
      get() {
        return this.$store.getters.selectedDropOffTime;
      },
      set(value) {
        this.setDropOff(value);
      }
    },


    /**
     * Only used in development mode as the google
     * place component needs to use a method
     * and not model data
     */
    pickupAddress: {
      get() {
        return this.$store.getters.selectedPickupAddress;
      },
      set(value) {
        this.setPickupAddress(value);
      }
    }
  },

  methods: {
    ...mapActions({
      setTimeBlocks: 'setBlocks',
      changeBlock: 'changeBlock',
      setBus: 'setBus',
      setName: 'setName',
      setPhone: 'setPhone',
      setPickup: 'setPickup',
      setDropOff: 'setDropOff',
      setPickupAddress: 'setPickupAddress'
    }),


    /**
     * Open either the pickup or
     * the dropoff timepicker provided
     * an enum
     *
     * @param {('PICKUP'|'DROPOFF')} detail
     *
     */
    openTimePicker(detail) {
      let key = detail === 'PICKUP' ? 'showPickup' : 'showDropOff';
      this[key] = !this[key];
      closePickers = () => {
        console.log('CLOSE PICKERS');
        this[key] = false;
        document.body.removeEventListener('click', closePickers);
      };
      document.body.addEventListener('click', closePickers);

    },

    /**
     * Emitted from timepicker after user
     * closes or navigates away.
     *
     * @param data
     *
     */
    startTimePicked({ hour, minute }) {
      let t = moment().set({
        hour,
        minute
      }).format('LT');
      document.body.removeEventListener('click', closePickers);
      this.showPickup = false;
      this.setPickup(t);
    },

    /**
     * Emitted after user choses dropoff
     * time and timepicker is closed or
     * user navigates away.
     *
     * @param data
     *
     */
    endTimePicked({ hour, minute }) {
      let t = moment().set({
        hour,
        minute
      }).format('LT');
      document.body.removeEventListener('click', closePickers);
      this.showDropOff = false;
      this.setDropOff(t);
    },


    minDropOffTime() {
      let pickup = moment(this.pickupTime, 'LT');
      if (pickup < 16) {
        return pickup.add(6, 'hours').hours();
      } else {
        return pickup.add(4, 'hours').hours();
      }
    },

    /**
     * Sets the chosen address on the store
     *
     * @param addressData
     * @param placeResultData
     */
    getAddressData(addressData, placeResultData) {
      console.log('GOT ADDRESS', addressData, placeResultData)
      this.setPickupAddress(placeResultData.formatted_address);
    },


    /**
     * Emitted on the blur event
     * for the autocomplete field
     *
     */
    checkAddressCompletion(addressData, placeResultData) {
      console.log('BLUR')
    },


    /**
     * Emitted when NO results were
     * returned from google service
     *
     */
    clearInvalidAddress() {
      console.log('NO INFO')
    },


    /**
     * Emitted when on CHANGE of
     * the autocomplete address
     *
     */
    checkAddressDate(addressData) {
      this.setPickupAddress(addressData);
    },

    nextStep(event) {
      this.$emit('next');
    },

    previousStep() {
      this.$emit('previous');
    }
  }
}
</script>
<style></style>
