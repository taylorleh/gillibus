<template>
  <div class="home container-fluid content">
    <div class="subheader row clock-container bg-info"></div>
    <ul class="row hidden-sm-up fleet-panel pl-0 list-inline">
      <li class="col text-center" :class="bus.toLocaleLowerCase()" v-for="bus in buses">
        <span class="status-wrapper text-muted">
          <i class="fa fa-circle" :class="{'bus-active': activeBuses[bus]}"></i>
        </span><span>{{bus}}</span>
      </li>
    </ul>
    <div class="map-container row">
      <div class="col">
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
              :icon="icons[val.name]">
            </gmap-marker>
          </gmap-map>
          <span v-show="nobus" class="overlay-container bg-inverse"></span>
          <span v-show="nobus" class="overlay-message text-white">No Drivers Are Sharing Their Location Yet!</span>
          <div class="fleet-panel hidden-xs-down">
            <b-card class="m-0 p-0" no-block header="FLEET">
              <b-list-group>
                <b-list-group-item v-for="bus in buses" :key="bus">
                  <img :src="icons[bus.toUpperCase()]" alt=""><span class="pl-1 pr-1 text-uppercase">{{bus}}</span>
                  <span :class="{'text-success': activeBuses[bus], 'text-danger': !activeBuses[bus]}" class="ml-auto text-end">{{activeBuses[bus] ?
                    "online" : "offline"}}</span>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { MAP_OPTIONS, MAP_CENTER, MAP_ZOOM } from '../../config';
import { bAlert, bBtn, bListGroup, bListGroupItem } from 'bootstrap-vue/lib/components'

export default {
  components: { bListGroupItem, bListGroup },

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
<style lang="scss">
  @import "../../less/variables";
  @import "../../less/fonts/fonts";

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

    .status-wrapper {
      font-size: xx-small;
    }

    /*.bus-active {*/
    /*color: green;*/
    /*}*/

    .subheader {
      min-height: 3em;
      margin-top: -1rem;
    }

    .fleet-panel {
      background-color: $white;
      /*list-style-type:none;*/
      /*background-color: #fff;*/

      /*.status {*/
      /*display: inline-block;*/
      /*text-align: right;*/
      /*float: right;*/
      /*cursor: default;*/
      /*color: #ff3a0f;*/

      /*}*/

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
        opacity: 0.65;
        top: 0;
        bottom: 0;
        width: 100%;
        position: absolute;
      }

      .overlay-message {
        width: 100%;
        top: 50%;
        text-align: center;
        position: absolute;
        font-size: 2em;
      }

    }

    @media (min-width: map_get($grid-breakpoints, sm)) {
      .fleet-panel {
        position: absolute;
        top: 2em;
        left: 2em;
        width: 13em;
      }
    }

  }
</style>
