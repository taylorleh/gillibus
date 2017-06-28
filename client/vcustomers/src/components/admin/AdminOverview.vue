<template>
  <div class="container-fluid admin-overview">
    <h2>Admin Overview</h2>
    <div class="row">
      <section class="col-xs-12 col-sm-6 left-stats">
        <div class="row available-balance-container">
          <section class="col-xs-12 monthly-sales">
            <div class="panel panel-primary">
              <div class="panel-heading">Lifetime Available Balance</div>
              <div class="panel-body">
                <p v-if="available[0]" class="text-center h3 no-margin pad-tb-half center-block">{{available[0].amount / 100 | currency }}</p>
              </div>
            </div>
          </section>
        </div>
        <div class="row pending-balance-container">
          <section class="col-xs-12">
            <div class="panel panel-primary">
              <div class="panel-heading">Current Pending Balance</div>
              <div class="panel-body">
                <p v-if="pending[0]" class="text-center h3 no-margin pad-tb-half center-block">{{pending[0].amount / 100 | currency }}</p>
              </div>
            </div>
          </section>
        </div>
        <div class="row monthly-sales-container">
          <section class="col-xs-12 monthly-sales">
            <div class="panel panel-primary">
              <div class="panel-heading">Last 5 Orders</div>
              <div class="panel-body">
                <el-table
                  :data="latestCharges"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="metadata.name"
                    label="Customer"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="purchased"
                    label="Purchase Date"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="total"
                    label="Total">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section class="col-xs-6">
        <div class="panel panel-primary">
          <div class="panel-heading">Total Orders</div>
          <commit-chart class="chart-panel-body panel-body" :options="chartOptions" :chartData="chartData"></commit-chart>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import CommitChart from '../global/salesChart';
import { generateWeekLabels, generateChartData } from 'utils/adminUtils/overviewUtils';

export default {
  components: {
    CommitChart
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
      return generateChartData(totalCharges+1);
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
<style lang="less">
  @import "../../less/index.less";

  .admin-overview {
    .panel-body {
      padding: 0;
    }
    .chart-panel-body {
      padding: 2em;
    }
  }
</style>
