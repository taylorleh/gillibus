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

  import { DAY_LABELS } from '../../util/config';
  import {Calendar} from 'calendar';
  window.Calendar = Calendar; //FIXME - Remove this!

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
      }
    },

    methods: {
      ...mapActions({
        nextMonth:'ADD_MONTH',
        prevMonth:'SUBTRACT_MONTH'
      }),

      dayClick(date) {
        this.$emit('dayClick', date);
      }
    },

    created() {
      this.cal = new Calendar();
      this.dayLabels = DAY_LABELS;
      console.log('CAL', Calendar);
    }
  }
</script>
<style lang="less">
  .calendar-container {
    font-family:Bebas-neue;

    ul {
      list-style: none;
      li {
        float: left;
      }
    }
  }

</style>
