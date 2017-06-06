<template>
  <div class="container-fluid charter">
    <div>
      <!--<full-calendar :events="events"></full-calendar>-->
      <event-calendar :events="events"></event-calendar>
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
      ])
    },


    created() {
      const today = moment().startOf('month').format('YYYY-MM-DDTHH:mm:ssZ');
      console.log('toady', today);
      ['CHARTER_G3', 'CHARTER_CHARLIE'].forEach(bus => {
        this.fetchEvents({
          calendar: 'CHARTER_G3',
          timeMin: today
        })
      });
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
