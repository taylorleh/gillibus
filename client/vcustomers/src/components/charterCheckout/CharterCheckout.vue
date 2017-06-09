<template>
  <div class="container charter checkout">
    <div class="previous-step">
      <div class="row">
        <div class="col-xs-12 text-center before-header">
          <span>Dates</span>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 text-center before-info">
          <span>{{ chosenDate }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 text-center before-action">
          <router-link to="charter" tag="button">Change Date</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-5 col-xs-12 booking-detail-outer">
        <div class="booking-details">
          <div class="date-summary tbl-row">
            <span class="tbl-cell tbl-cell-lbl">Date:</span> <span class="tbl-cell">{{ chosenDate}}</span>
          </div>
          <div class="bus-summary tbl-row">
            <label class="tbl-cell tbl-cell-lbl" for="bus">Bus</label>
            <div class="tbl-cell">
              <select v-model="selectedBus" name="bus" id="bus" class="form-control">
                <option v-for="bus in buses" :value="bus.value" :disabled="bus.disabled"> {{ bus.text }}</option>
              </select>
            </div>
          </div>
          <div class="time-slot tbl-row">
            <span class="tbl-cell tbl-cell-lbl">Time</span>
            <div class="tbl-cell">
              <select v-model="selectedBlock" name="time-block" id="time-block" class="form-control">
                <option v-for="block in timeBlocks" :value="block.value" :disabled="block.disabled">
                  {{ block.text }}
                </option>
              </select>
              <!--<select name="time-block" id="time-block" ng-model="vm.formState.checkoutBookTimeBlock" class="form-control" ng-options="c as c.name disable when c.disabled for c in vm.formState.blocks" ng-change="vm.onTimeBlockChange(this)"> </select>-->
            </div>
          </div>
          <div class="duration-slot tbl-row">
            <span class="tbl-cell tbl-cell-lbl">Duration</span>
            <div class="tbl-cell">
              <select v-model="selectedDuration" class="form-control" name="duration-block" id="duration-block">
                <option v-for="time in durations" :value="time.value" :disabled="time.disabled">
                  {{ time.text }}
                </option>
              </select>
            </div>
          </div>
          <div class="price-summary tbl-row">
            <span class="tbl-cell tbl-cell-lbl">Price</span>
            <!--<span class="tbl-cell">{{vm.formState.checkoutTotalPrice | currency}}</span>-->
          </div>
          <div>
            <p></p>
          </div>
          <div>
            <p></p>
          </div>
        </div>
      </div>
      <div class="col-sm-7 col-xs-12">
        <div class="payment">
          <div class="payment-form">
            <div class="group">
              <label class="form-name">
                <span>Name</span>
                <input ng-model="formState.checkoutBookCustName" name="cardholder-name" class="field" placeholder="Jane Doe" />
              </label>
              <label>
                <span>Phone</span>
                <input ng-model="formState.checkoutBookCustPhone" class="field" placeholder="(123) 456-7890" type="tel" />
              </label>
            </div>
            <div class="s-container">
                <card class="stripe-card" id="card-element" :stripe="stripeKey" :options="stripeOptions"></card>
            </div>
            <!--<button type="submit">Purchase</button>-->
            <button class='pay-with-stripe' @click='pay'>Pay with credit card</button>
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
  import moment from 'moment';
  import { STRIPE_KEY } from '../../config';
  import { createToken } from 'vue-stripe-elements';

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

    props: {
      date: {
        type: Date,
        required: true
      }
    },

    data() {
      return {
        stripeOptions: style,
        complete: false
      }
    },

    computed: {
      ...mapGetters({
        durations: 'durations',
        timeBlocks: 'timeBlocks',
        buses: 'busChoices'
      }),

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

      chosenDate() {
        return moment(this.date).format('LL');
      }
    },

    methods: {
      ...mapActions({
        setTimeBlocks: 'setBlocks',
        changeBlock: 'changeBlock',
        setBus: 'setBus'
      }),

      pay() {
        createToken()
          .then(data => {
            console.log('SUCCESS!!!', data);
          })
          .catch(error => {
            console.error(error);
          })
      }
    },

    created() {
      this.stripeKey = STRIPE_KEY;
      this.setTimeBlocks(this.date);
    }
  }
</script>
<style lang="less">
  @import "../../less/variables";

  .checkout {
    .stripe-card {
      font-family: Abel;
      color: red;
      width:100%;
      box-shadow: 0 7px 14px 0 rgba(49, 49, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.08);
      background-color: white;
      padding: 1em;

    }

    .previous-step {
      font-family: bebas-neue;
      font-size: 3em;
      padding: 5rem 0;
      border-bottom: 5px solid;

      .before-info {
        font-size: 2.2rem;
        color: grey;
      }

      .before-action {
        color: @link-blue;
        button {
          background-color: inherit;
          border: 1px solid @link-blue;
          padding: .2rem 2rem;
          font-size: 2.8rem;
        }
      }
    }

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
        box-shadow: 0 7px 14px 0 rgba(49,49,93,0.10),
        0 3px 6px 0 rgba(0,0,0,0.08);
        border-radius: 4px;
        margin-bottom: 20px;
      }

      label {
        position: relative;
        color: #8898AA;
        font-weight: 300;
        height: 65px;
        line-height: 65px;
        margin:0;
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
        box-shadow: 0 7px 14px 0 rgba(49,49,93,0.10), 0 3px 6px 0 rgba(0,0,0,0.08);
        border-radius: 4px;
        border: 0;
        margin-top: 20px;
        font-size: 15px;
        font-weight: 400;
        width: 100%;
        height: 40px;
        line-height: 38px;
        outline: none;
        transition: background-color .5s cubic-bezier(0.22, 0.61, 0.36, 1);
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

    @media (min-width: @screen-sm) {

      label > span {
        margin-right: 30px;
        width: 80px;
      }
    }

  }

</style>
