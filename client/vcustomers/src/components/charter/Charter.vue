<template>
  <div class="container-fluid charter">
    <div>
      <event-calendar @dayClick="dayClick" :events="events"></event-calendar>
    </div>
    <div class="checkout-modal row"></div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';

  import fullCalendar from 'vue-fullcalendar';
  import eventCalendar  from '../eventCalendar';
  import moment from 'moment';


  export default {
    components: { fullCalendar, eventCalendar },


    computed: {
      ...mapGetters([
        'events'
      ])
    },


    methods: {
      ...mapActions([
        'fetchEvents'
      ]),
      dayClick(date) {
        this.$router.push({
          name: 'checkout',
          params: { date }
        });
      }
    },


    created() {
      const today = moment().startOf('month').format('YYYY-MM-DDTHH:mm:ssZ');
      const eom = moment().endOf('month').format('YYYY-MM-DDTHH:mm:ssZ');
      console.log('toady', today);
      this.fetchEvents({ timeMin: today, timeMax: eom});

    }
  }
</script>
<style lang="less">
  @import "../../less/variables";

  .charter {
    .early-book {
      padding-top: .5em;
      padding-left: 0;
      button {
        //transform: translate(15%, 25%);
      }
    }

    .late-book {
      position: absolute;
      bottom: 0;
      right: 0;
      text-align: right;
      padding-bottom: .5em;
      padding-right: 0;
    }

  }
</style>
