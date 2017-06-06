<template>
  <div class="container">
    <div style="text-align: center;" class="row">
      <h1>Welcome</h1>
    </div>
    <div class="row">
      <div style="background-color: #843534; color: white; padding: 1.5em; -webkit-border-radius:1.5em ;-moz-border-radius:1.5em ;border-radius: 1.5em;" class="col-xs-6 col-xs-offset-3">
        <span>You are about to share your devices location with everyone who accesses this site. Before you do so please choose which bus bus you are in so this is reflected properly on the site.</span><br><br>
        <span> Once you choose a bus, you will not have the option to choose another. You must accept the devices request to use your geolocation. Good Luck!</span>
      </div>
    </div>
    <div style="margin-top: 1.5em" class="row">
      <div class="col-xs-6 col-xs-offset-3">
        <div class="form-horizontal">
          <div class="form-group">
            <label for="driver-bus">What Bus Are You Driving?</label> <select
            name="driver-bus"
            id="driver-bus"
            class="form-control"
            @change="busSelect(selected)"
            v-model="selected"
          >
            <option disabled value="">Please Choose A Bus</option>
            <option v-for="bus in buses">{{ bus }}</option>
          </select>
          </div>
        </div>
      </div>
    </div>
    <div v-if="polling" class="row">
      <div class="col-xs-6 col-xs-offset-3">
        <h3 style="width: 100%; text-align: center">You are sharing your GP</h3>
        <div style="display: inline-block; width: 45%; text-align: center;">
          <div>longitude</div>
          <div v-show="position.coords.longitude">{{ position.coords.longitude }}</div>
        </div>
        <div style="display: inline-block; width: 45%; text-align: center">
          <div>latitude</div>
          <div v-show="position.coords.latitude">{{ position.coords.latitude }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    sockets: {
      connect() {
        console.log('%cSOCKET CONNECTED', 'color:brown');
        console.log(this.$socket);
      }
    },


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
      })
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
        clearPosition: 'clearPosition'
      }),
      busSelect: function(name) {
        console.info(`choose buse: ${this.selected}`);
        this.$socket.emit('driver chooses bus', name);
        this.setIsPolling();
        this.beginPolling(this.geolocationOptions);
      },
      decimal: (val) => {
        let s = val.toString();
        return s.substring(0, s.indexOf('.') + 5);
      }
    },

    created() {
      console.log(`CREATED \n \n ${this}`);
      console.log(this.$socket);
      if(this.$socket.disconnected) {
        console.log('socket is disconnect. attempt reconnect');
        this.$socket.connect();
      }
    },
    destroyed() {
      console.info('DESTROY');
      this.clearPosition();
      this.$socket.disconnect();
    }
  }
</script>
