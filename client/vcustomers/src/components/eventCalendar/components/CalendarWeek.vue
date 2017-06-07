<template>
  <ul class="week-container">
    <li v-for="day in week" :class="{'filler-cell': day.getMonth() != monthKey }" class="day-cell" >
      <div class="day-content" @click="dayClick(day)">
        {{ day.getDate() }}
      </div>
    </li>
  </ul>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'CalendarWeek',

    props: ['week', 'monthKey', 'events'],

    methods: {
      disableBooking(day) {

      },

      dayClick(day) {
        this.$emit('dayClick', day);
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
      display: flex;
      align-items:center;
      justify-content: center;
      font-size: 2em;
      font-family: Abel;
      -webkit-transition: border-color .1s ease-in, border-width .2s ease-in;
      -moz-transition: border-color .1s ease-in, border-width .2s ease-in;
      -ms-transition: border-color .1s ease-in, border-width .2s ease-in;
      -o-transition: border-color .1s ease-in, border-width .2s ease-in;
      transition: border-color .1s ease-in, border-width .2s ease-in;

      &:hover {
        cursor: pointer;
        border-color: #0fb4f1;
        border-width:2px;
        /*border: 2px solid ;*/
      }
    }
  }

</style>
