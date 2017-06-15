<template>
  <div class="calendar-container">
    <calendar-header
      v-on:prevMonth="prevMonth"
      v-on:nextMonth="nextMonth"
      :labels="dayLabels"
      :currentYear="currentYear"
      :currentMonth="currentMonth"
      :monthKey="month"
      :year="year">
    </calendar-header>
    <!--suppress CommaExpressionJS -->
    <calendar-week v-for="(week, index) in daysGrid"
                   :key="index"
                   :week="week"
                   :schedule="datesMap"
                   :monthKey="month"
                   :events="events"
                   :currentMonth="currentMonth"
                   :currentDay="currentDay"
                   @dayClick="dayClick">
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
  window.Calendar = Calendar;
  window.moment = moment;
  const today = new Date();

  export default {
    name: 'EventCalendar',

    components: { CalendarHeader, CalendarWeek },

    props: ['events'],

    data() {
      return {
        currentYear: today.getFullYear(),
        currentMonth: today.getMonth(),
        currentDay: today.getDate()
      }
    },

    computed: {
      ...mapGetters({
        year: 'yearKey',
        month: 'monthKey'
      }),

      daysGrid() {
        return this.cal.monthDates(this.year, this.month);
      },

      datesMap() {
        return this.daysGrid.reduce((memo, week) => {
          week.forEach(day => {
            memo[day] = {_dayCount: 0, _nightCount: 0};
          });
          return memo;
        }, {});
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
    }
  }
</script>
<style lang="less">
  .calendar-container {
    font-family: Bebas-neue;

    ul {
      list-style: none;
      padding: 0;
      li {
        float: left;
      }
    }
  }
</style>
