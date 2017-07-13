<template>
  <div class="container">
    <div class="row">
      <div class="col offset-md-2">
        <h2 class="h2">Bus Location</h2>
      </div>
    </div>
    <div class="row">
      <div class="col offset-md-2 col-md-8">
        <b-alert show variant="warning">
          <p>You are about to share your devices location with everyone who accesses this site. Before you do so please choose which bus bus you are in so this is reflected properly on the site.</p>
          <p> Once you choose a bus, you will not have the option to choose another. You must accept the devices request to use your geolocation.</p>
        </b-alert>
      </div>
    </div>
    <div class="row">
      <div class="col offset-md-2 col-md-8">
        <b-form-fieldset
          label="What Bus Are You Driving?"
          :label-cols="3">
          <b-form-select @change.native="busSelect(selected)"
            v-model="selected"
            :options="formattedBuses"
            class="mb-3">
          </b-form-select>
        </b-form-fieldset>
      </div>
    </div>
    <section v-if="polling" class="row">
      <div class="col offset-md-2 col-md-8">
        <div class="row">
          <h3 class="col-12 text-center">You are sharing your GP</h3>
        </div>
        <div class="form-group">
          <!--<label for="formGroupExampleInput">Example label</label>-->
          <label class="col-md-3 col-form-label">longitude</label>
          <!--<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input">-->
          <p class="col-md-3" v-show="position.coords.longitude">{{position.coords.longitude}}</p>
        </div>
        <div class="form-group">
          <label class="col-md-3 col-form-label">latitude</label>
          <p class="col-md-3" v-show="position.coords.longitude">{{ position.coords.latitude }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {

  data() {
    return {
      selected: '',
      geolocation: null,
      geolocationOptions: {
        timeout: 30000,
        maximumAge: 250,
        enableHighAccuracy: true
      }
    }
  },


  computed: {
    ...mapGetters({
      buses: 'busNames',
      polling: 'polling',
      position: 'position'
    }),

    formattedBuses() {
      return this.buses.map(b => {
        return { text: b, value: b };
      }).concat({
        text: 'Please select a bus',
        disabled: true,
        value: ''
      }).reverse()
    }
  },

  watch: {
    position: function(newPosition) {
      const pos = newPosition.coords;
      this.$socket.emit('driver location', {
        location: {
          latitude: pos.latitude,
          longitude: pos.longitude,
          accuracy: pos.accuracy,
          heading: pos.heading
        },
        bus: this.selected
      });
    }
  },


  methods: {
    ...mapActions({
      setIsPolling: 'setIsPolling',
      beginPolling: 'beginPollingGps',
      clearPosition: 'clearPosition',
      addMessage: 'addMessage'
    }),

    busSelect: function(name) {
      this.$socket.emit('driver chooses bus', name);
      this.setIsPolling();
      this.beginPolling(this.geolocationOptions);
    }

  },

  created() {
    if (this.$socket.disconnected) {
      this.$socket.connect();
    }
  },

  destroyed() {
    this.clearPosition();
    this.$socket.disconnect();
  }
}
</script>
