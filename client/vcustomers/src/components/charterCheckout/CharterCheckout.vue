<!--suppress ALL -->
<template>
  <div class="charter checkout" :class="{'loading': loading }">
    <section class="container">
      <div class="row previous-step">
        <div class="col-12 before-header">
          <span>Dates</span>
        </div>
        <div class="col-12 before-info">
          <span>{{ chosenDate }}</span>
        </div>
        <div class="col-12">
          <router-link class="before-action btn btn-outline-primary btn-large"
            to="/charter"
            tag="button">Change Date
          </router-link>
        </div>
        <div class="col-12 hr-rule">
          <hr>
        </div>
      </div>
    </section>

    <div class="container checkout-container bg-faded p-4 mb-3">
      <div class="row mb-5 justify-content-center">
        <form-stepper :activeStep="formStep" :stepOptions="['details', 'payment', 'review', 'confirmation']">
          <div class="w-100 align-self-center">
            <transition name="fade">
              <div
                v-show="formStep >= 0"
                style="background-color: #4096E7; height: 2px;"
                class="w-50 float-right">&nbsp;
              </div>
            </transition>
          </div>
          <form-step>
            <span id="first" class="">1</span>
            <p slot="description" class="p-0 m-0">Details</p>
          </form-step>


          <div class="w-100 align-self-center">
            <transition name="fade">
              <div
                v-show="formStep >= 1"
                style="background-color: #4096E7; height: 2px;"
                class="w-100 align-self-center">&nbsp;
              </div>
            </transition>
          </div>
          <form-step>
            <span class="">2</span>
            <p slot="description" class="p-0 m-0">Payment</p>
          </form-step>


          <div class="w-100 align-self-center">
            <transition name="fade">
              <div
                v-show="formStep >= 2"
                style="background-color: #4096E7; height: 2px;"
                class="w-100 align-self-center">&nbsp;
              </div>
            </transition>
          </div>
          <form-step>
            <span class="">3</span>
            <p slot="description" class="p-0 m-0">Review</p>
          </form-step>


          <div class="w-100 align-self-center">
            <transition name="fade">
              <div
                v-show="formStep >= 3"
                style="background-color: #4096E7; height: 2px;"
                class="w-100 align-self-center">&nbsp;
              </div>
            </transition>
          </div>
          <form-step>
            <span class="">4</span>
            <p slot="description" class="p-0 m-0">Confirmation</p>
          </form-step>
        </form-stepper>
      </div>

      <router-view @previous="previousStep" @next="nextStep" :isDetailsValid="isDetailsValid"></router-view>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { formatMonies } from '../../util/adminUtils/overviewUtils';
import { generateTimesArray } from 'utils/checkoutUtils';
import moment from 'moment';
import { STRIPE_KEY } from '../../config';
import { createToken } from 'vue-stripe-elements';
import { steps, step, Loading } from 'element-ui/lib';
import CustomerNotifications from '../CustomerNotifications.vue';

import $ from 'jquery';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import FormStepper from "../global/FormStepper/FormStepper.vue";
import FormStep from "../global/FormStep/FormStep.vue";

//
//import GoogleLocations from 'google-locations';
//let locations = new GoogleLocations('AIzaSyAirP89osWYJpZQPOuUrCeFaO2kF3NS9eA', {
//  headers: {
//    'Access-Control-Allow-Origin': '*'
//  }
//});


let style = {
  base: {
    color: '#31325F',
    'font-family': 'Abel',
    fontSize: '1.05rem',
    fontWeight: 300,
    iconColor: '#666EE8',
    lineHeight: '65px',
  },
  empty: {
    color: 'green'
  },
  invalid: {
    color: '#cc4f55'
  }
};

export default {
  name: 'CharterCheckout',

  components: {
    FormStep,
    FormStepper,
    CustomerNotifications,
    VueGoogleAutocomplete
  },

  props: {
    date: {
      type: Date,
      required: true
    }
  },

  data() {
    return {
      stripeOptions: style,
      complete: false,
      loading: false,
      step: 'details',
      allSteps: ['details', 'payment', 'review'],
      pickerStart: {
        start: '08:30',
        step: '00:15',
        end: '18:30'
      },
      formStep: 0
    }
  },

  computed: {
    ...mapGetters({
      durations: 'durations',
      timeBlocks: 'timeBlocks',
      buses: 'busChoices',
      price: 'totalPrice',
      selectedBus:'selectedBus',
      pickupTime: 'selectedPickupTime',
      dropOffTime: 'selectedDropOffTime'
    }),

//    customerAddress: {
//      get() {
//
//      },
//      set(value) {
//        console.log('address change', value);
//
//        locations.autocomplete({ input: value, types: "address" }, function(err, response) {
//          console.log("autocomplete: ", response.predictions);
//
//          var success = function(err, response) {
//            console.log("did you mean: ", response.result.name);
//            // did you mean:  Vermont
//            // did you mean:  Vermont South
//            // did you mean:  Vermilion
//            // did you mean:  Vermillion
//          };
//
//          for (var index in response.predictions) {
//            locations.details({ placeid: response.predictions[index].place_id }, success);
//          }
//        });
//      }
//    },

    startOptions() {
      return generateTimesArray(10, 22, 15);
    },

    endOptions() {
      return generateTimesArray(10, 22, 15);
    },

    name: {
      get() {
        return this.$store.getters.getName;
      },
      set(value) {
        this.setName(value);
      }
    },

    phone: {
      get() {
        return this.$store.getters.getPhone;
      },
      set(value) {
        this.setPhone(value);
      }
    },

//    selectedBus: {
//      get() {
//        return this.$store.getters.selectedBus;
//      },
//      set(value) {
//        this.setBus(value);
//      }
//    },

    selectedBlock: {
      get() {
        return this.$store.getters.selectedBlock;
      },
      set(block) {
        this.changeBlock({ block, day: this.date });
      }
    },

    selectedDuration: {
      get() {
        return this.$store.getters.selectedDuration;
      },
      set(value) {
        this.$store.commit('SET_CHOSEN_DURATION', value);
      }
    },

    disableSubmit() {
      return (this.loading || (!this.name || !this.phone));
    },

    chosenDate() {
      return moment(this.date).format('LL');
    },

//    STEP VALIDATIONS
    isDetailsValid() {
      return this.requiredFieldsExist(['selectedBus', 'pickupTime', 'dropOffTime']);
    }
  },

  methods: {
    ...mapActions({
      setTimeBlocks: 'setBlocks',
      changeBlock: 'changeBlock',
      setBus: 'setBus',
      setName: 'setName',
      setPhone: 'setPhone'
    }),

    /**
     * Iterates through a form steps required fields,
     * ensuring that a value exists.
     *
     * @param {Array} fields - form fields to validate
     * @returns {Array}
     *
     */
    requiredFieldsExist(fields) {
      return fields.every(function(f) {
        return !!this[f];
      }.bind(this));
    },

    validForm() {
      return this.name && this.phone;
    },

    getAddressData(val) {
      console.log('PLACE CHANGED', val);
    },

    formatPrice(val) {
      return formatMonies(val);
    },

    nextStep() {
      let stepIndex = this.allSteps.indexOf(this.step);
      let nextName = this.allSteps[stepIndex + 1];

      this.$router.push(
        { name: this.allSteps[stepIndex + 1] },
        () => { this.formStep++; this.step = nextName; },
        () => { console.log('COULD NOT NAVIGATE'); }
      );
    },

    previousStep() {
      this.formStep--;
      this.$router.back();
    },

    pay() {
      this.loading = true;
      let overlay = Loading.service({
        text: 'Purchasing...',
        customClass: 'purchase-overlay'
      });

      createToken()
        .then(function(data) {
          if (data.error) {
            this.$store.dispatch('addMessage', {
              type: 'error',
              title: 'Could not complete order',
              description: data.error.message
            });
          }
          else {
            this.$store.dispatch('purchaseCharter', {
              token: data.token.id,
              amount: (this.price * 100),
              metadata: {
                name: this.name,
                phone: this.phone,
                bus: this.selectedBus.split('_')[1],
                time_block: this.selectedBlock,
                duration: this.selectedDuration,
                book_date: this.date
              }
            });
          }
          this.loading = false;
          overlay.close();
        }.bind(this))
        .catch(error => {
          this.loading = false;
          overlay.close();
          this.$store.dispatch('addMessage', {
            type: 'error',
            title: 'Error processing purchase',
            description: 'There was an error processing your purchase. please try again later.'
          });

        })
    }
  },

  created() {
    this.stripeKey = STRIPE_KEY;
    this.setTimeBlocks(this.date);
  }
}
</script>
<style lang="scss">
@import "~styles/variables";
@import "~styles/utilities";

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
{
  opacity: 0
}

.purchase-overlay {
  background: none;
}

.w-auto {
  width: auto !important;
}

.checkout {


  input.form-control::placeholder {
    font-weight: lighter;
    font-style: italic;
  }


  .line-through {
    width: 100%;
    background-color: grey;
    height: 2px;
  }

  .step-circle {
    width: 32px;
    height: 32px;
    background-color: $alert-success;
  }

  .checkout-messages {
    padding: 1em 0;
  }

  &.loading {
    opacity: 0.6;
  }

  hr {
    border-top: 5px solid;
  }

  .stripe-card {
    font-family: Abel;
    color: red;
    width: 100%;
    box-shadow: 0 7px 14px 0 rgba(49, 49, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.08);
    background-color: white;
    padding: 1em;
  }

  .previous-step {
    font-family: bebas neue;
    /*font-size: 3em;*/
    font-size: 2rem;
    text-align: center;

    .before-info {
      /*font-size: 2.2rem;*/
      color: grey;
    }

  }
  .before-action {
    //color: $button-blue;
    font-family: bebas neue;
    font-size: inherit;
  }

  /*BELOW HORIZONTAL RULE */

  .booking-details {
    display: table;
    font-size: 1.7rem;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    width: 100%;
    color: #8898AA;
    font-weight: 300 !important;

    label {
      font-weight: 300;
    }

    .tbl-row {
      display: table-row;
      height: 3em;
    }

    .tbl-cell {
      display: table-cell;
      vertical-align: middle;
      color: #1e3e63;
      &.tbl-cell-lbl {
        width: 30%;
      }
    }
  }

  .payment {
    margin-bottom: 3.5em;

    .payment-form {
      margin-top: 1.5em;
    }

    .group {
      background: white;
      box-shadow: 0 7px 14px 0 rgba(49, 49, 93, 0.10),
      0 3px 6px 0 rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      margin-bottom: 20px;
    }

    label {
      position: relative;
      color: #8898AA;
      font-weight: 300;
      height: 65px;
      line-height: 65px;
      margin: 0;
      display: flex;
      flex-direction: row;
      &.form-name {
        border-bottom: 1px solid black;
      }
    }

    label > span {
      width: auto;
      text-align: center;
      margin-right: 0;
      padding: 0 1rem;
    }

    .field {
      background: transparent;
      font-weight: 300;
      border: 0;
      color: #31325F;
      outline: none;
      flex: 1;
      padding-right: 10px;
      padding-left: 10px;
      cursor: text;
    }

    button {
      display: block;
      background: #666EE8;
      color: white;
      box-shadow: 0 7px 14px 0 rgba(49, 49, 93, 0.10), 0 3px 6px 0 rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      border: 0;
      margin-top: 20px;
      font-size: 15px;
      font-weight: 400;
      width: 100%;
      height: 40px;
      line-height: 38px;
      outline: none;
      transition: background-color .3s cubic-bezier(0.22, 0.61, 0.36, 1);
      padding: 0;

      &:hover {
        background: #36395a;
      }
    }

    .success, .error {
      display: none;
      font-size: 2rem;
      height: 4rem;
      line-height: 4rem;
      text-align: center;
    }

    .success.visible, .error.visible {
      display: inline;
    }

    .error {
      color: #E4584C;
    }

    .success {
      color: #666EE8;
    }

    .success .token {
      font-weight: 500;
      font-size: 13px;
    }

  }

  @media (min-width: map_get($grid-breakpoints, sm)) {

    label > span {
      margin-right: 30px;
      width: 80px;
    }
  }

}
</style>
