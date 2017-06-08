<template>
  <div class="home container-fluid content">
    <div class="subheader row clock-container">
      <div class="col-xs-9"></div>
      <div ng-if="tl.timer" class="col-xs-3 timer-container">
        <div countdown="tl.timer" class="innner"></div>
      </div>
    </div>
    <div class="show-xs hide-sm row">
      <div class="col-xs-12">
        <div class="fleet-panel">
          <div class="no-bottom-margin panel panel-default">
            <table class="table table-hover">
              <tbody>
              <tr>
                <td v-for="bus in buses" class="bus-cell"
                    :class="{'bus-active': bus in activeBuses}"
                >
                  <i :class="{'bus-active': bus in activeBuses}" class="fa fa-circle" aria-hidden="true"></i> -
                  <span :class="bus.toLowerCase()">{{bus}}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="map-container row" style="height: 500px; position: relative;">
      <div class="col-xs-12">
        <div class="map-wrapper">
          <gmap-map
            :center="center"
            :zoom="zoom"
            :options="options"
            class="map-container">
            <gmap-marker
              v-for="val in markers"
              :position="val.coords"
              :clickable="true"
              :draggable="true"
              :key="val.name"
              :icon="icons[val.name]"
            >
            </gmap-marker>
          </gmap-map>
          <span v-show="nobus" class="overlay-container"></span>
          <span v-show="nobus" class="overlay-message">No Drivers Are Sharing Their Location Yet!</span>
          <div class="fleet-panel show-sm hide-xs">
            <div class="panel panel-default">
              <div class="panel-heading">Fleet</div>
              <!-- Table -->
              <table class="table table-hover">
                <tbody>
                <tr v-for="bus in buses">
                  <td class="bus-cell">
                    <!--<img :src="charlieImg" alt="">-->
                    <img :src="icons[bus.toUpperCase()]" alt=""> <span>{{bus}}</span>
                    <div class="status">
                      <span class="status-text bus-active" v-show="bus in activeBuses">online</span>
                      <span class="status-text" v-show="!(bus in activeBuses)">offline</span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import { MAP_OPTIONS, MAP_CENTER, MAP_ZOOM } from '../../config';

  export default {
    sockets: {
      connect() {
        this.$socket.emit('what buses are online', data => {
          this.setBuses(data);
        })
      }
    },
    computed: {
      ...mapGetters({ // global map
        buses: 'busNames',
        icons: 'busIcons'
      }),
      ...mapGetters({
        activeBuses: 'activeBuses',
        nobus: 'noActiveBuses',
        markers: 'busMarkers'
      })
    },

    methods: {
      ...mapActions({
        setBuses: 'SET_ACTIVE_BUSES'
      })
    },
    created() {
      this.center = MAP_CENTER;
      this.zoom = MAP_ZOOM;
      this.options = MAP_OPTIONS;

    }
  }
</script>
<style lang="less">
  @import "../../less/variables";

  .home.container-fluid {
    .starship {
      color: #C400FF
    }

    .gillibus {
      color: #FF2600
    }

    .g3 {
      color: #FFC700
    }

    .charlie {
      color: #0FB4F1
    }

    .bus-active {
      color: green;
    }

    .subheader {
      min-height: 3em;
      background-color: lightseagreen;
      margin-top: -20px;

      .timer-container {
        min-height: inherit;
        font-weight: 200;
        font-size: 1.5em;
      }
    }

    .fleet-panel {
      font-family: bebas-neue;
      .status {
        display: inline-block;
        text-align: right;
        float: right;
        cursor: default;
        color: #ff3a0f;

      }

    }

    .map-container {
      position: relative;
      height: 70vh;
      .map-wrapper {
        position: relative;
      }

      .bus-cell {
        cursor: default;
      }

      .bus-active {
        cursor: pointer;
      }

      .overlay-container {
        background-color: black;
        opacity: 0.65;
        top: 0;
        bottom: 0;
        width: 100%;
        position: absolute;
      }

      .overlay-message {
        width: 100%;
        top: 50%;
        color: white;
        text-align: center;
        position: absolute;
        font-family: bebas-neue;
        font-size: 2em;
      }

    }

    @media (min-width: @screen-sm) {

      .fleet-panel {
        position: absolute;
        top: 2em;
        left: 2em;
        width: 13em;
      }
    }

  }
</style>
