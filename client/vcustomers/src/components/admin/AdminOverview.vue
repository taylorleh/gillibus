<template>
  <div class="container-fluid admin-overview">
    <h2>Admin Overview</h2>
    <div class="row">
      <section class="col-12 col-sm-6">
        <b-card no-block class="mb-4"
          :header-class="['bg-primary', 'text-white']"
          header="Lifetime Available Balance">
          <div class="card-block py-2">
            <p v-if="available[0]" class="text-center h4 mb-0">
              {{available[0].amount / 100 | currency }}
            </p>
          </div>
        </b-card>
        <b-card no-block class="mb-4"
          :header-class="['bg-primary', 'text-white']"
          header="Current Pending Balance">
          <div class="card-block py-2">
            <p v-if="available[0]" class="text-center h4 mb-0">
              {{pending[0].amount / 100 | currency }}
            </p>
          </div>
        </b-card>
        <b-card no-block class="mb-4"
          :header-class="['bg-primary', 'text-white']"
          header="Last 5 Orders">
          <div class="card-block p-0">
            <el-table :data="latestCharges" border>
              <el-table-column prop="metadata.name" label="Customer"></el-table-column>
              <el-table-column prop="purchased" label="Purchase Date"></el-table-column>
              <el-table-column prop="total" label="Total"></el-table-column>
            </el-table>
          </div>
        </b-card>
      </section>
      <section class="col-12 col-sm-6">
        <b-card no-block class="mb-4"
          :header-class="['bg-primary', 'text-white']"
          header="Total Orders">
          <div class="card-block py-2">
            <commit-chart class="chart-panel-body panel-body"
              :options="chartOptions"
              :chartData="chartData">
            </commit-chart>
          </div>
        </b-card>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import { bCard } from 'bootstrap-vue/lib/components';
import CommitChart from '../global/salesChart';
import { generateWeekLabels, generateChartData } from 'utils/adminUtils/overviewUtils';
import ElRow from "element-ui/packages/row/src/row";
import ElCol from "element-ui/packages/col/src/col";

export default {
  components: {
    ElCol,
    ElRow,
    CommitChart,
    bCard
  },

  computed: {
    ...mapGetters({
      charges: 'stripeMonthlyCharges',
      latestCharges: 'lastFiveCharges',
      available: 'availableBalance',
      pending: 'pendingBalance',
      chargesAfterDate: 'chargesAfterDate',
      highestTransactionsDuringPeriod: 'highestTransactionsDuringPeriod'
    }),

    chartOptions() {
      let totalCharges = this.highestTransactionsDuringPeriod(moment().subtract(7, 'days'));
      return generateChartData(totalCharges + 1);
    },

    chartData() {
      let labels = generateWeekLabels();
      let weeksCharges = this.chargesAfterDate(moment().subtract(7, 'days'));
      return {
        labels: labels,
        datasets: [
          {
            data: weeksCharges
          }
        ]
      }
    }
  },

  methods: {
    ...mapActions({
      getCharges: 'getCharges',
      getBalance: 'getAccountBalance'
    })
  },

  created() {
    this.getBalance();
    this.getCharges({
      begin: moment().startOf('month').unix()
    });
  }

}
</script>
<style lang="scss">
  /*@import "../../less/index";*/

  .admin-overview {
    .panel-body {
      padding: 0;
    }
    .chart-panel-body {
      padding: 2em;
    }
  }
</style>
