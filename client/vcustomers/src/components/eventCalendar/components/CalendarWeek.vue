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
        bus.$emit('date availability', date, (res) => {
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
      .day-content {
        text-align: center;
        height: 100%;
        font-size: 2em;
        font-family: Abel;
        position: relative;
        outline: 2px solid dimgrey;

        &.booked {
          cursor: default;
          color:darkgrey;
        }


        &:not(.booked) {
          outline: 2px solid black;
          -webkit-transition: outline 105ms ease-in-out;
          -moz-transition: outline 105ms ease-in-out;
          -ms-transition: outline 105ms ease-in-out;
          -o-transition: outline 105ms ease-in-out;
          transition: outline 105ms ease-in-out;
          &:hover {
            cursor: pointer;
            outline: 3px solid black;
          }
        }


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

      }

    }
  }

</style>
