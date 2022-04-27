<template>
  <div class="row justify-content-center">
    <form @submit.prevent class="col-sm-10 col-xl-8">


      <section class="row">
        <div class="form-group col-sm">
          <label for="cFirstName" class="required">First Name</label> <input type="text"
          class="form-control"
          id="cFirstName">
        </div>
        <div class="form-group col-sm">
          <label for="cLastName" class="required">Last Name</label> <input id="cLastName"
          type="text"
          class="form-control">
        </div>
      </section>

      <section class="form-group">
        <label for="cAddress1" class="required">Address Line 1</label>
        <div class="">
          <input type="text" required class="form-control" id="cAddress1">
        </div>
      </section>

      <section class="form-group">
        <label for="cPhone" class="">Address Line 2</label>
        <div class="">
          <input type="text" class="form-control" id="cPhone">
        </div>
      </section>


      <section class="row">
        <div class="form-group col-sm-6">
          <label class="required" for="cCity">City</label> <input id="cCity" type="text" class="form-control">
        </div>
        <div class="form-group col-sm">
          <label class="required" for="cState">State</label>
          <b-form-select required v-model="states" class="form-control" :options="states" id="cState"></b-form-select>
        </div>
        <div class="form-group col-sm">
          <label class="required" for="cZip">Zip</label> <input id="cZip" type="number" class="form-control">
        </div>
      </section>

      <section class="form-group">
        <label for="cPhone" class="required">Phone Number</label>
        <div class="">
          <input type="text" class="form-control" id="cPhone">
        </div>
      </section>


      <section class="form-group">
        <label for="cEmail" class="required">Email</label>
        <div class="">
          <input type="text" class="form-control" id="cEmail">
        </div>
      </section>

      <section class="row justify-content-end">
        <div class="col-sm-4">
          <button @click="previousStep" class="btn btn-default mb-4 btn-block">Back</button>
        </div>
        <div class="col-sm-4">
          <button @click="nextStep" class="btn btn-success btn-block">Continue</button>
        </div>
      </section>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { STRIPE_KEY } from "../../config";
import { createToken } from 'vue-stripe-elements';
import { STATE_ABBREVIATIONS } from "../../config/index";


export default {
  name: 'PaymentStep',

  computed: {
    states() {
      return Object.keys(STATE_ABBREVIATIONS);
    }
  },

  methods: {
    nextStep(event) {
      this.$emit('next');
    },

    previousStep() {
      this.$emit('previous');
    }
  },

  created() {
    this.stripeKey = STRIPE_KEY;
  }
}
</script>
<style></style>
