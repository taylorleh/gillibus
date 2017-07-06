<template>
  <div class="container charter checkout" :class="{'loading': loading }">
    <div class="row previous-step">

        <div class="col-12 before-header">
          <span>Dates</span>
        </div>


        <div class="col-12 before-info">
          <span>{{ chosenDate }}</span>
        </div>


        <div class="col-12">
          <router-link class="before-action btn btn-outline-primary btn-large" to="charter" tag="button">Change Date</router-link>
        </div>

      <div class="col-12 hr-rule">
        <hr>
      </div>

    </div>
    <div class="checkout-messages">
      <!--<customer-notifications></customer-notifications>-->
    </div>
    <div class="row"> <!-- BEGING BOTTOM CONTAINER -->
      <div class="col">
        <b-form>
          <b-form-fieldset :horizontal="true" label="Date">
            <b-form-input :readonly="true" :static="true" :value="chosenDate"></b-form-input>
          </b-form-fieldset>
          <b-form-fieldset :horizontal="true" label="Bus">
            <b-form-select v-model="selectedBus" :options="buses"></b-form-select>
          </b-form-fieldset>
          <b-form-fieldset :horizontal="true" label="Time">
            <b-form-select v-model="selectedBlock" :options="timeBlocks"></b-form-select>
          </b-form-fieldset>
          <b-form-fieldset :horizontal="true" label="Duration">
            <b-form-select v-model="selectedDuration" :options="durations"></b-form-select>
          </b-form-fieldset>
          <b-form-fieldset :horizontal="true" label="Price">
            <b-form-input-static :formatter="this.formatPrice" :readonly="true" :static="true" :value="price"></b-form-input-static>
          </b-form-fieldset>
        </b-form>
      </div>
      <!--<div class="col col booking-detail-outer">-->
        <!--<div class="booking-details">-->
          <!--<div class="date-summary tbl-row">-->
            <!--<span class="tbl-cell tbl-cell-lbl">Date:</span> <span class="tbl-cell">{{ chosenDate}}</span>-->
          <!--</div>-->
          <!--<div class="bus-summary tbl-row">-->
            <!--<label class="tbl-cell tbl-cell-lbl" for="bus">Bus</label>-->
            <!--<div class="tbl-cell">-->
              <!--<select v-model="selectedBus" name="bus" id="bus" class="form-control">-->
                <!--<option v-for="bus in buses" :value="bus.value" :disabled="bus.disabled"> {{ bus.text }}</option>-->
              <!--</select>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="time-slot tbl-row">-->
            <!--<span class="tbl-cell tbl-cell-lbl">Time</span>-->
            <!--<div class="tbl-cell">-->
              <!--<select v-model="selectedBlock" name="time-block" id="time-block" class="form-control">-->
                <!--<option v-for="block in timeBlocks" :value="block.value" :disabled="block.disabled">-->
                  <!--{{ block.text }}-->
                <!--</option>-->
              <!--</select>-->
              <!--&lt;!&ndash;<select name="time-block" id="time-block" ng-model="vm.formState.checkoutBookTimeBlock" class="form-control" ng-options="c as c.name disable when c.disabled for c in vm.formState.blocks" ng-change="vm.onTimeBlockChange(this)"> </select>&ndash;&gt;-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="duration-slot tbl-row">-->
            <!--<span class="tbl-cell tbl-cell-lbl">Duration</span>-->
            <!--<div class="tbl-cell">-->
              <!--<select v-model="selectedDuration" class="form-control" name="duration-block" id="duration-block">-->
                <!--<option v-for="time in durations" :value="time.value" :disabled="time.disabled">-->
                  <!--{{ time.text }}-->
                <!--</option>-->
              <!--</select>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="price-summary tbl-row">-->
            <!--<span class="tbl-cell tbl-cell-lbl">Price</span> <span class="tbl-cell">{{ price | currency }}</span>-->
          <!--</div>-->
          <!--<div>-->
            <!--<p></p>-->
          <!--</div>-->
          <!--<div>-->
            <!--<p></p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->






      <div class="col">
        <div class="payment">
          <div class="payment-form">
            <div class="group">
              <label class="form-name"> <span>Name</span>
                <input v-model="name" name="cardholder-name" class="field" placeholder="Jane Doe"/> </label> <label>
              <span>Phone</span> <input v-model="phone" class="field" placeholder="(123) 456-7890" type="tel"/> </label>
            </div>
            <div class="s-container">
              <card class="stripe-card" id="card-element" :stripe="stripeKey" :options="stripeOptions"></card>
            </div>
            <button :disabled="disableSubmit" class='pay-with-stripe btn btn-default' @click='pay'>Pay with credit card</button>
          </div>
          <div class="row">
            <div class="outcome">
              <div class="error"></div>
              <div class="success">
                Success! Your Stripe token is <span class="token"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { formatMonies } from '../../util/adminUtils/overviewUtils';
import moment from 'moment';
import { STRIPE_KEY } from '../../config';
import { createToken } from 'vue-stripe-elements';
import { Loading } from 'element-ui';
import CustomerNotifications  from '../CustomerNotifications.vue';

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

  components: { CustomerNotifications },

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
      loading: false
    }
  },

  computed: {
    ...mapGetters({
      durations: 'durations',
      timeBlocks: 'timeBlocks',
      buses: 'busChoices',
      price: 'totalPrice',
    }),

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

    selectedBus: {
      get() {
        return this.$store.getters.selectedBus;
      },
      set(value) {
        this.setBus(value);
      }
    },

    selectedBlock: {
      get() {
        return this.$store.getters.selectedBlock;
      },
      set(block) {
        this.changeBlock({ block, day: this.date });
      }
    },

    selectedDuration: {
      get(){
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

    validForm() {
      return this.name && this.phone;
    },

    formatPrice(val) {
      return formatMonies(val);
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
  @import "../../less/variables";

  .purchase-overlay {
    background: none;
  }

  .checkout {

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
      font-family: bebas-neue;
      /*font-size: 3em;*/
      font-size:2rem;
      text-align: center;


      .before-info {
        /*font-size: 2.2rem;*/
        color: grey;
      }


    }
    .before-action {
      //color: $button-blue;
      font-family: bebas-neue;
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
