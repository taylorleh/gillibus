<template>
  <ul class="week-container">
    <li v-for="day in week" :class="{'filler-cell': day.getMonth() != monthKey }" class="day-cell" >
      <div v-if="!isDateBooked(day)" class="day-content" @click="dayClick(day)">
        <p class="day-label">{{ day.getDate() }}</p>
      </div>
      <div v-else :class="['day-content', 'booked']">
        <div class="day-label">{{ day.getDate() }}</div>
        <div class="align-base">unavailable</div>
      </div>
    </li>
  </ul>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import bus from '../../../util/eventChannel';

  export default {
    name: 'CalendarWeek',

//    props: ['week', 'monthKey', 'events', 'schedule'],

    props: {

      week: {
        type: Array,
        required: true
      },
      monthKey: {
        type: Number,
        required: true
      },

      events: {
        type: [Object, Array]
      },

      schedule: {
        type: Object,
        required: true
      }

    },

    methods: {
      dayClick(day) {
        this.$emit('dayClick', day);
      },

      isDateBooked(date) {
        let status;
        bus.$emit('date availability', date.toString(), (res) => {
          status = !res.bookDay && !res.bookNight;
        });
        return status;
      }
    },

    created() {

    }
  }
</script>
<style lang="less">
  .week-container {
    width: 100%;
    height: 17rem;
    line-height:17rem;

    .day-cell {
      width:14%;
      height:100%;
      padding: .5rem;


      &.filler-cell {
        visibility: hidden;
      }

    }
    .day-content {
      text-align: center;
      border-width:1px;
      border-style: solid;
      border-color: black;
      height: 100%;
      font-size: 2em;
      font-family: Abel;
      position: relative;

      -webkit-transition: border-color .1s ease-in, border-width .2s ease-in;
      -moz-transition: border-color .1s ease-in, border-width .2s ease-in;
      -ms-transition: border-color .1s ease-in, border-width .2s ease-in;
      -o-transition: border-color .1s ease-in, border-width .2s ease-in;
      transition: border-color .1s ease-in, border-width .2s ease-in;


      .day-label {
        height:inherit;
        margin:0;
      }

      .align-base {
        position: absolute;
        bottom: 0;
        width:100%;
        line-height:normal;
        font-size:.5em;
        font-family:Jura;
      }

      &.booked {
        border-color: darkgrey;
        cursor: default;
        color:darkgrey;

      }

      &:not(.booked) {
        &:hover {
          cursor: pointer;
          border-color: #0fb4f1;
          border-width:2px;
        }
      }

      &:hover {
        /*cursor: pointer;*/
        /*border-color: #0fb4f1;*/
        /*border-width:2px;*/
        /*border: 2px solid ;*/
      }
    }
  }

</style>
