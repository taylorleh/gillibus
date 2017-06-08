<template>
  <div style="text-align:center;">
    <h2 style="text-align:center;">{{month}} {{year}}</h2>
    <div style="margin-bottom:1em;">
      <button @click="prev" class="btn btn-default">&lsaquo;</button>
      <button @click="next" class="btn btn-default">&rsaquo;</button>
    </div>
    <ul class="calendar-header-container">
      <li class="day-header" v-for="l in labels">{{l}}</li>
    </ul>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  import moment from 'moment';

  export default {
    name: 'CalendarHeader',
    props: ['labels', 'monthKey', 'year'],
    computed: {
      month() {
        return moment().month(this.monthKey).format('MMMM');
      }
    },
    methods: {
      prev() {
        this.$emit('prevMonth');

      },
      next() {
        this.$emit('nextMonth');
      }
    }
  }
</script>
<style lang="less">

  .calendar-header-container {
    height: 2.5rem;
    margin: 0;
    .day-header {
      position: relative;
      width: 14%;
      text-align: center;
    }
  }

</style>
