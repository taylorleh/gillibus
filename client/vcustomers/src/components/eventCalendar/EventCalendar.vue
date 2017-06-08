<template>
  <div class="calendar-container">
    <calendar-header
      v-on:prevMonth="prevMonth"
      v-on:nextMonth="nextMonth"
      :labels="dayLabels"
      :monthKey="month"
      :year="year">
    </calendar-header>
    <calendar-week v-for="(week, index) in daysGrid"
                   :key="index"
                   :week="week"
                   @dayClick="dayClick"
                   :monthKey="month">
    </calendar-week>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import CalendarHeader from './components/CalendarHeader.vue';
  import CalendarWeek from './components/CalendarWeek.vue';

  import { DAY_LABELS } from '../../config';
  import moment from 'moment';
  import { Calendar } from 'calendar';

  export default {
    name: 'EventCalendar',

    components: { CalendarHeader, CalendarWeek },

    props: ['events'],

    computed: {
      ...mapGetters({
        year: 'yearKey',
        month: 'monthKey'
      }),
      daysGrid() {
        return this.cal.monthDates(this.year, this.month);
      },
      datesMap() {
        this.daysGrid.forEach(d => {
          console.log('d', d);
        });
        return {};
      }
    },

    methods: {
      ...mapActions({
        nextMonth: 'ADD_MONTH',
        prevMonth: 'SUBTRACT_MONTH'
      }),

      dayClick(date) {
        this.$emit('dayClick', date);
      }
    },

    created() {
      this.cal = new Calendar();
      this.dayLabels = DAY_LABELS;
      let dates = {};
      let datesMap = this.daysGrid.forEach(w => {
        w.forEach(d => {
          dates[moment(d)] = {};
        });
      });
    }
  }
</script>
<style lang="less">
  .calendar-container {
    font-family: Bebas-neue;

    ul {
      list-style: none;
      li {
        float: left;
      }
    }
  }
</style>
